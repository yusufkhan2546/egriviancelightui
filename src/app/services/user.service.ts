import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserState } from '../states/user.state';
import { Store } from '@ngxs/store';
import { User } from '../models/user.model';
import { UserRegister, GetUsers, GetUserById, UpdateUser } from '../actions/user.action';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private store:Store) { }
 public register(user:User){
 return this.store.dispatch(new UserRegister(user));
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
}
