import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Assign } from 'src/app/models/assign.model';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  currentUser: User
  editBasic: Boolean = false;
  editWork: Boolean = false;
  editSmtp: Boolean = false;
  basicForm: FormGroup;
  workForm: FormGroup;
  smtpForm:FormGroup
  constructor(private user: UserService,
    private fb: FormBuilder,
     private toastr:ToastrService,
     private auth:AuthenticationService) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUser = user;
    this.basicForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required]
    });
    this.workForm = this.fb.group({
      dob: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
      address: ['', Validators.required]
    });
    this.smtpForm = this.fb.group({
      smtpServer: ['', Validators.required],
      smtpUsername: ['', Validators.required],
      smtpPassword: ['', Validators.required],
      smtpPort: ['', Validators.required],
      tlsssl: ['', Validators.required]
    });

this.mapBasicForm(this.basicForm,this.currentUser);
this.mapworkForm(this.workForm,this.currentUser);
this.mapsmtpForm(this.smtpForm,this.currentUser)
  }
  reset(number) {
     switch(number){
      case 1: this.basicForm.reset();
               this.mapBasicForm(this.basicForm,this.currentUser);
                 break;
       case 2: this.workForm.reset(); this.mapworkForm(this.workForm,this.currentUser); break;
       case 3: this.smtpForm.reset(); this.mapsmtpForm(this.smtpForm,this.currentUser); break;             
     }        
  }
  cancel(number) {
   this.reset(number);
   switch(number){
       case 1:  this.editBasic = false; break;
       case 2: this.editWork = false; break;
       case 3:  this.editSmtp =false;break;
   }
  }
  mapBasicForm(Form:FormGroup,user:User){
     Form.get('firstName').setValue(this.currentUser.firstName);
     Form.get('lastName').setValue(this.currentUser.lastName);
     Form.get('email').setValue(this.currentUser.email);
     Form.get('phone').setValue(this.currentUser.phone);
     Form.get('gender').setValue(this.currentUser.gender);
  }
  mapsmtpForm(Form:FormGroup,user:User){
    Form.get('smtpServer').setValue(this.currentUser.smtpServer);
    Form.get('smtpUsername').setValue(this.currentUser.smtpUsername);
    Form.get('smtpPassword').setValue(this.currentUser.smtpPassword);
    Form.get('smtpPort').setValue(this.currentUser.smtpPort);
    Form.get('tlsssl').setValue(this.currentUser.tlsssl);
  }
  mapworkForm(Form:FormGroup,user:User){
    Form.get('dob').setValue(this.currentUser.dob);
    Form.get('city').setValue(this.currentUser.city);
    Form.get('state').setValue(this.currentUser.state);
    Form.get('pincode').setValue(this.currentUser.pincode);
    Form.get('address').setValue(this.currentUser.address);
  }
  getbasicFormStatus(){
    return this.basicForm.untouched || this.basicForm.invalid;
  }
  getworkFormStatus(){
    return this.workForm.untouched || this.workForm.invalid;
  }
  getsmtpFormStatus(){
    return this.smtpForm.untouched || this.smtpForm.invalid;
  }
 submitBasic(){
 if(this.basicForm.valid){
  let payload:any[] = [];
  payload.push(new Assign('firstName',this.basicForm.get('firstName').value));
  payload.push(new Assign('lastName',this.basicForm.get('lastName').value));
  payload.push(new Assign('gender',this.basicForm.get('gender').value));
  payload.push(new Assign('email',this.basicForm.get('email').value));
  payload.push(new Assign('phone',this.basicForm.get('phone').value));
  this.user.updateUser(payload,this.currentUser._id);
  setTimeout(() => {
    this.auth.logout();
  }, 500);

  }else {
    this.toastr.error('Invalid Data');
  }
  
 }
 submitSmtp(){
  if(this.workForm.valid){
    let payload:any[] = [];
    payload.push(new Assign('smtpServer',this.smtpForm.get('smtpServer').value));
    payload.push(new Assign('smtpUsername',this.smtpForm.get('smtpUsername').value));
    payload.push(new Assign('smtpPassword',this.smtpForm.get('smtpPassword').value));
    payload.push(new Assign('smtpPort',this.smtpForm.get('smtpPort').value));
    payload.push(new Assign('tlsssl',this.smtpForm.get('tlsssl').value));
    this.user.updateUser(payload,this.currentUser._id);
    setTimeout(() => {
      this.auth.logout();
    }, 500);
   } else {
     this.toastr.error('Invalid Data');
   }
 }
 submitWork(){
   if(this.workForm.valid){
    let payload:any[] = [];
    payload.push(new Assign('dob',this.workForm.get('dob').value));
    payload.push(new Assign('city',this.workForm.get('city').value));
    payload.push(new Assign('state',this.workForm.get('state').value));
    payload.push(new Assign('pincode',this.workForm.get('pincode').value));
    payload.push(new Assign('address',this.workForm.get('address').value));
    this.user.updateUser(payload,this.currentUser._id);
    setTimeout(() => {
      this.auth.logout();
    }, 500);
   } else {
     this.toastr.error('Invalid Data');
   }
}
}

