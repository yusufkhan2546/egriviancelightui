import { User } from '../models/user.model';

export class UserRegister {
    static readonly type = '[User] Register';
    constructor(public User:User) {}
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