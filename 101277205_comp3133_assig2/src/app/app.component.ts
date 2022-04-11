import { Component, NgModule } from '@angular/core';
import {Router} from '@angular/router'
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = '101054615_comp3133_assig2';
  userRole = "guest"
  ngOnInit(){
    this.userRole = this.UserRole()
    console.log(this.userRole)
  }
  
  isLogged = new BehaviorSubject<boolean>(false);
  constructor(private _router: Router,private authService: AuthService) {
    if (localStorage.getItem("token")) this.isLogged.next(true);
    else this.isLogged.next(false);
    console.log("isLogged "+ this.isLogged.value);
  }

  token = localStorage.getItem("token")
  

  SignUp() {
    console.log("signUp clicked");
    this._router.navigateByUrl('/register')
  }

  Login() {
    console.log("Login Clicked");
    this._router.navigateByUrl('/login')
  }

  Logout(){
    this.authService.signout();
  }
  

  UserRole(){
    let token = localStorage.getItem("token")
    if (token==null) token = ""
    let userRole = (token)? JSON.parse(atob(token.split('.')[1])).type: "guest"
    if (userRole == "admin") userRole = "admin"
    else if (userRole == "user") userRole = "user"
    return userRole
  }
}

function constructor() {
  throw new Error('Function not implemented.');
}

