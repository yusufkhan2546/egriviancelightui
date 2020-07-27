import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserState } from '../states/user.state';
import { Store } from '@ngxs/store';
import { User } from '../models/user.model';
import { UserRegister, GetUsers, GetUserById, UpdateUser, SendUpdate } from '../actions/user.action';
import { MailModel } from '../models/mail.model';
import { Templates } from '../models/templates.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  mail = new MailModel();
  templates = new Templates();
  constructor(private store:Store) { }
 public register(user:User){
  let html = this.templates.registerTemplate;
  html = html.replace('{{name}}',user.firstName);
  html = html.replace('{{email}}',user.email);
  html = html.replace('{{password}}',user.password);
   this.mail.to = user.email;
   this.mail.subject ='Regestration Details';
   this.mail.html = html;
   this.mail.text ='Regestration';
   
  
 return this.store.dispatch(new UserRegister(user,this.mail));
 }
 public getUsers(){
  return this.store.dispatch(new GetUsers());
  }
  public getUserById(id:string){
    return this.store.dispatch(new GetUserById(id));
    }
    public updateUser(payload:any[],id:string){
      return this.store.dispatch(new UpdateUser(payload,id));
  }
  public sendMail(id,mail){
    return this.store.dispatch(new SendUpdate(id,mail));
  }
}
