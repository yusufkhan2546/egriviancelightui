import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  year = new Date().getFullYear();
  loginForm:FormGroup;
  constructor(private fb:FormBuilder,
               private toastr:ToastrService
               ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
       email:['',Validators.required],
       password:['',Validators.required]
    });
  }
login(){
  if(this.loginForm.valid){
    console.log(this.loginForm.value);
  }else{
    this.toastr.error('One or more fields are empty');
  }
}
}
