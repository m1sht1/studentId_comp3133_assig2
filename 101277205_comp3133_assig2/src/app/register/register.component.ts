import { Component, Injectable, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable,Subscription } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormControl,Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



const ADD_USER = gql`
mutation($username: String!, $firstname: String!, $lastname: String!, $password: String!, $email: String!, $type: String!){
  register(username: $username, firstname: $firstname, lastname: $lastname, password: $password, email: $email, type: $type) {
    username
    firstname
    lastname
    email
    type
  }
}
`;


@Injectable({
  providedIn: 'root'
})
class AddUserService {
  constructor(private apollo: Apollo) {}

  addUser(username: string,firstname:string,lastname:string,password:string,email:string,type:string) {
    return this.apollo.mutate({
      mutation: ADD_USER,
      variables: {
        username,
        firstname,
        lastname,
        password,
        email,
        type
      }
    });
  }
}




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private addUserService: AddUserService,private http: HttpClient, private router: Router,private _snackBar: MatSnackBar,private apollo: Apollo) { }


  UserNameControl = new FormControl('',[Validators.required]);
  EmailControl = new FormControl('',[Validators.required,Validators.email]);
  PasswordControl = new FormControl('',[Validators.required]);
  ConformPasswordControl = new FormControl('',[Validators.required]);
  FirstNameControl = new FormControl('',[Validators.required]);
  LastNameControl = new FormControl('',[Validators.required]);
  TypeControl = new FormControl('',[Validators.required])



  loading = true;
  users: any;

  private querySubscription!: Subscription;

  ngOnInit(): void {
  }

  getErrorMessage_1() {
    if (this.UserNameControl.hasError('required')) {
      return 'You must enter a value';
    }
    return null;
  }

  getErrorMessage_2(){
    if (this.FirstNameControl.hasError('required')) {
      return 'You must enter a value';
    }
    return null;
  }

  getErrorMessage_3(){
    if (this.LastNameControl.hasError('required')) {
      return 'You must enter a value';
    }
    return null;
  }

  getErrorMessage_4(){
    if (this.EmailControl.hasError('required')) {
      return 'You must enter a value';
    }

    if(this.EmailControl.hasError('email')){
      return 'Not a valid email';
    }
    return null;
  }

  getErrorMessage_5(){
    if (this.PasswordControl.hasError('required')) {
      return 'You must enter a value';
    }
    return null;
  }

  getErrorMessage_6(){
    if (this.ConformPasswordControl.hasError('required')) {
      return 'You must enter a value';
    }
    return null;
  }


  signup(){

    if(this.UserNameControl.value=="" || this.EmailControl.value=="" ||  this.PasswordControl.value=="" || 
    this.ConformPasswordControl.value=="" || this.FirstNameControl.value=="" || this.LastNameControl.value=="" || this.TypeControl.value==""){
      alert("Registration Failed !!!");
    }

    else if(this.PasswordControl.value==this.ConformPasswordControl.value){

      this.addUserService.addUser(this.UserNameControl.value,this.FirstNameControl.value,this.LastNameControl.value,this.PasswordControl.value,this.EmailControl.value,this.TypeControl.value)
      .subscribe(({ data }) => {
        console.log('got data', data);
        this.router.navigateByUrl('/login')
      }, (error) => {
        console.log('there was an error sending the query', error);
      });
  
      console.log(this.TypeControl.value+ " Logged in")
    }
    else{
      alert("Password does not match !")
    }
    
  }
}


