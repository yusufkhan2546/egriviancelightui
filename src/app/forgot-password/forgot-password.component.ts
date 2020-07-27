import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MailModel } from '../models/mail.model';
import { Templates } from '../models/templates.model';
import { Store } from '@ngxs/store';
import { Mail, UserReset } from '../actions/user.action';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
year = new Date().getFullYear();
resetForm:FormGroup;
mail = new MailModel();
template = new Templates()
  constructor(private store:Store,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      email:['',[Validators.required]]
    });
  }
getStatus(){
  return Boolean (this.resetForm.invalid || this.resetForm.untouched) ;
}
submitEmail(){
  if(this.resetForm.valid){
    this.mail.to = this.resetForm.get('email').value;
    this.mail.subject = 'Password reset';
    this.mail.text = 'Password reset';
     let html = this.template.resetTemplate;
     html = html.replace('{{email}}',this.resetForm.get('email').value);
     this.mail.html = html;
    this.store.dispatch(new UserReset(this.resetForm.value,this.mail));
  }
}
}
