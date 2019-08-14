import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface IToken{
  token: string
};

interface IResponse{
  response:Object,
  log:{
    message:string,
    status:string,
  }
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private TOKEN_STR="tkn";
  private API_URL = "/api";
  
  constructor(private http:HttpClient) { }


  //token localstorage section
  loadToken(): string {
    const etkn = localStorage.getItem(this.TOKEN_STR)
    return this.decodeToken(etkn);
  }
  saveToken(token: string){
    const etoken = this.encodeToken(token);
    localStorage.setItem(this.TOKEN_STR,etoken);
  }
  encodeToken(token: string):string{
    //do some encoding 
    const result = token;
    return result;
  }
  decodeToken(etoken: string):string{
    //do some decoding
    const result= etoken;
    return result;
  }
  
  isLoggedIn(): boolean{
    if(this.loadToken!==null){
      //do some token check on api return false if token invalid
    }
    else{
      return false
    }

  }
  logOut():void{
    localStorage.removeItem(this.TOKEN_STR);
  }

  //api section

  askForToken(username:string,password:string):Observable<IToken>{
    return this.http.post<IToken>(this.API_URL + '/login-submit',{
      'username':username,
      'password':password
    });
  }
  checkToken(token: String){

  }

}
