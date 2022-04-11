import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Apollo, gql } from 'apollo-angular';
import { map, Observable,Subscription } from 'rxjs';
import {Router} from '@angular/router'

const LOGIN = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
    firstname
    lastname
    type
    token
  }
}
`;



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = new BehaviorSubject<boolean>(false);
  constructor(private apollo: Apollo,private _router: Router) {
    if (localStorage.getItem("token")) this.isAuthenticated.next(true);
    else this.isAuthenticated.next(false);
   }


   login(username: string, password: string) {
    this.apollo
      .watchQuery<any>({
        query: LOGIN,
        variables: { username, password }
      })
      .valueChanges
      .subscribe(
        ({ data }) => {
          localStorage.setItem("token", data.login.token);
          localStorage.setItem("type", data.login.type);
          this._router.navigateByUrl('/')
          console.log( data.login.token)
          console.log( data.login.firstname)
          console.log( data.login.lastname)
          console.log( data.login.type)
          window.location.reload()
        },
        error => {
          console.log("there was an error sending the query", error);
        }
      );
  }

  signout() {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    this.isAuthenticated.next(false);
    location.reload();
    this._router.navigateByUrl('/')
    console.log("Log out successfully");
    
  }
}

