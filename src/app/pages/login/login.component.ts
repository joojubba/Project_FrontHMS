import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, public loginService : LoginService){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        username: ['',[Validators.required]],
        password: ['',[Validators.required]]
      }
    );
  }
  submitLogin()
  {
    debugger
    var dataLogin = this.loginForm.getRawValue() as User;

     this.loginService.LoginUser(dataLogin)
     .subscribe(
       token =>
       {
         debugger
         var clientToken = token
       },
       error =>
       {

       }
     )
      this.router.navigate(["/home"]);
  }
}
