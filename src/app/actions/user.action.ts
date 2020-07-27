import { User } from '../models/user.model';
import { MailModel } from '../models/mail.model';

export class UserRegister {
    static readonly type = '[User] Register';
    constructor(public User:User,
                 public mail:MailModel) {}
  }
  export class GetUsers {
    static readonly type = '[User] Get';
  }
  export class GetUserById {
    static readonly type = '[User] Get By ID';
    constructor(public id:string) {}
  }
  export class DeleteUser{
    static readonly type = '[User] Delete' ;
    constructor(public id:string){}
   } 
 export class UpdateUser{
  static readonly type = '[User] Update' ;
  constructor( public payload:any[],
               public userid:string){}
   } 
   export class SendUpdate {
     static readonly type ='[User] Email';
     constructor(public id:string,
                 public content:MailModel){

     }
    }
     export class Mail {
      static readonly type ='[User] Mail';
      constructor  (public content:MailModel){
 
      } 
   }
   export class UserReset {
    static readonly type = '[User] Reset';
    constructor(public email:string,
                 public mail:MailModel) {}
  }