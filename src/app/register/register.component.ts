import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Role } from '../helpers/role.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
year = new Date().getFullYear();
role;
userForm:FormGroup;
  constructor(private fb:FormBuilder,
               private toastr:ToastrService,
               private user:UserService,
                private router:Router) { }

  ngOnInit(): void {
    const url = this.router.url;
    console.log(url);
    
    if(url === '/adminregister'){
      this.role = Role.Admin;
    } else {
      this.role = Role.User;
    }
   
    this.userForm = this.fb.group({
      firstName:['',Validators.required],
      gender:['',Validators.required],
      email:['',Validators.required],
      city:['',Validators.required],
      address:['',Validators.required],
      password:['',Validators.required],
      lastName:['',Validators.required],
      phone:['',Validators.required],
      state:['',Validators.required],
      dob:['',Validators.required],
      pincode:['',Validators.required],
      confirmpassword:['',Validators.required],
      role:[this.role]
    });
  }
  submitUser(){
    if(this.userForm.valid){
    
      if(this.userForm.get('password').value === this.userForm.get('confirmpassword').value){
        console.log(this.userForm.value);
        this.user.register(this.userForm.value);
      }else {
        this.toastr.info('Passwords are not Matching ');
      }
      
    }else {
      this.toastr.error('Invalid Data');
    }
  }
  reset(){
    this.userForm.reset();
  }
  cancel(){
    if(this.userForm.touched){
      
    }else {
      this.userForm.reset();
      this.router.navigate([`/`])
    }
  }

}
