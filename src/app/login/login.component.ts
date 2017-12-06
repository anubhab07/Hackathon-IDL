import { Component, OnInit } from '@angular/core';
import { FetchUserService } from './fetch-user.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { User } from './user'
import { window } from 'rxjs/operators/window';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  uname:string="aaa";
  pass:string="aaa";
  users:User[];
  loginForm;
  constructor(private _userData:FetchUserService,private fb:FormBuilder,private router:Router) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.fb.group({
      username:['',[Validators.required,Validators.maxLength(15)]],
      password:['',Validators.required]
    });
  }

  submitLogin(){
    console.log(this.loginForm)
    if(this.loginForm.valid){
      this.validateUser();
    }
    else{
      return false;
    }
  }

  validateUser(){
    this._userData.getUsers().subscribe(user=>{
      var flag=0;

      user.forEach(user => {
        if(user.username==this.loginForm.value.username && user.password==this.loginForm.value.password){
          flag=1;
        }
      });
      if(flag==1){
        this._userData.auth=true;
        this.router.navigate(['/place-order'])
      }
      else{
        this._userData.auth=false;
      }
      console.log(flag)
    })
  }
  
  get username() { return this.loginForm.get('username'); }
}
