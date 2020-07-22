import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
year = new Date().getFullYear();
userForm:FormGroup;
  constructor(private fb:FormBuilder,
               private toastr:ToastrService,
               private user:UserService) { }

  ngOnInit(): void {
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
    });
  }
  submitUser(){
    if(this.userForm.valid){
    
      if(this.userForm.get('password').value === this.userForm.get('confirmpassword').value){
        console.log(this.userForm.value);
        this.user.register(this.userForm.value);
      }else {
        this.toastr.info('Passwords are not Matching ')
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
    }
  }

}
