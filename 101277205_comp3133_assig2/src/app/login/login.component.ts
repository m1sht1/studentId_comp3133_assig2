import { HttpParams } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from "rxjs";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  UserNameControl = new FormControl('',[Validators.required]);
  PasswordControl = new FormControl('',[Validators.required]);

  constructor(private apollo: Apollo,private authService: AuthService) { }



  getErrorMessage_1() {
    if (this.UserNameControl.hasError('required')) {
      return 'You must enter a value';
    }
    return null;
  }


  getErrorMessage_2() {
    if (this.UserNameControl.hasError('required')) {
      return 'You must enter a value';
    }
    return null;
  }

  ngOnInit(): void {
  }


  login(){
    if(this.UserNameControl.value=="" || this.PasswordControl.value==""){
      alert("User Name or Password can not be empty !!!");
    }

    else {
      this.authService.login(this.UserNameControl.value,this.PasswordControl.value);
    }

    
  }

}
