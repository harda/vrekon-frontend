import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private fb:FormBuilder
    ) { }
  loginForm : FormGroup;
  ngOnInit() {
    this.loginForm = this.fb.group({
      "username":[''],
      "password":['']
    })
  }


  onSubmit() : void {
    console.log("on - login - check");
    const username = this.loginForm.controls.username.value;
    const password = this.loginForm.controls.password.value;
    console.log(username);
    if(username === null || password===null){

    }
    this.authService.askForToken(username,password).subscribe((result) =>{
      console.log(result);
    });
  }

}
