import { StateContext, State, Action, Store } from '@ngxs/store';
import { Injectable, NgZone } from '@angular/core';
import { UserRegister, GetUsers, GetUserById, UpdateUser } from '../actions/user.action';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { ProgressService } from '../services/progress.service';

const headers = new HttpHeaders({
    'Content-Type': 'application/json',
 });
export interface UserStateModel {
    user: User;
    users:User[];
  }
  @State<UserStateModel>({
    name: 'User',
    defaults: {
      user:null,
      users:[],
    }
  })
  @Injectable()
  export class UserState {
      apiUrl;
      constructor(private http:HttpClient,
                  private store:Store,
                  private toastr:ToastrService,
                  private router:Router,
                  private progress:ProgressService
              
                  ){
this.apiUrl = environment.apiUrl;
      }
    @Action(UserRegister)
    public createUser(context:StateContext<UserStateModel>,{User}:UserRegister){
       this.progress.show();
       return  this.http.post(`${this.apiUrl}/users/signup`,User,{headers}).pipe().subscribe(res=>{
            if(res){
                this.toastr.success('User Created Successfullyy');
                this.router.navigate([`/user`]);
                this.progress.hide();
            }
            return res;
        });

    }
    @Action(GetUsers)
public getUser(context:StateContext<UserStateModel>){
  this.progress.show();
 return this.http.get(`${this.apiUrl}/users`,{headers}).pipe().subscribe((res:User[])=>{
   if(res){
      const state = context.getState();
      context.patchState({users:res});
      this.progress.hide();
    } 
    return res;
  
 });

}
@Action(GetUserById)
public getUserById(context:StateContext<UserStateModel>,{id}:GetUserById){
  this.progress.show();
 return this.http.get(`${this.apiUrl}/users/${id}`,{headers}).pipe().subscribe((res:any)=>{
   if(res){
      const state = context.getState();
      context.patchState({user:res}); 
      this.progress.hide();
    } 
    return res;
   
 });

}
@Action(UpdateUser)
public updateUser(context:StateContext<UserStateModel>,{payload, userid }:UpdateUser){
  this.progress.show();
  return this.http.patch(`${this.apiUrl}/users/${userid}`,payload,{headers}).pipe().subscribe(res=>{
        if(res){
            this.store.dispatch(new GetUserById(userid));
             this.toastr.info('Updated SuccessFully Login Required');
             this.progress.hide();
          } 
        return res;
    });

}
  }