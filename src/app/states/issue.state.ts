import { StateContext, State, Action, Store, StateToken } from '@ngxs/store';
import { Injectable, NgZone } from '@angular/core';
import { CreateIssue, GetIssues, GetIssueById, ClearIssue, UpdateIssue } from '../actions/issue.action';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { IssueModel } from '../models/Issue.model';
import { Router } from '@angular/router';
import { Result } from '../models/result.model';
import { ProgressService } from '../services/progress.service';


const headers = new HttpHeaders({
    'Content-Type': 'application/json',
 });
export interface IssueStateModel {
    Issue: IssueModel;
    Issues:Result;
  }
  export const Issue_state_token = new StateToken<IssueStateModel>('Issue_state_token');
  @State<IssueStateModel>({
    name: 'Issue_state_token',
    defaults: {
      Issue:null,
      Issues:null,
    }
  })
  @Injectable()
  export class IssueState {
      apiUrl;
      constructor(private http:HttpClient,
                  private store:Store,
                  private toastr:ToastrService,
                  private router:Router,
                  private progress:ProgressService
                  ){
this.apiUrl = environment.apiUrl;
      }
    @Action(CreateIssue)
    public createIssue(context:StateContext<IssueStateModel>,{issue}:CreateIssue){
      this.progress.show();
       return this.http.post(`${this.apiUrl}/issues`,issue,{headers}).pipe().subscribe(res=>{
            if(res){
                this.toastr.success('Issue Created Successfully');
                this.router.navigate([`/issuelist`]);
                this.progress.hide();
            } 
           return res;
        });
       
    }
@Action(GetIssues)
public getIssues(context:StateContext<IssueStateModel>){
  this.progress.show();
 return this.http.get(`${this.apiUrl}/issues`,{headers}).pipe().subscribe((res:Result)=>{
   if(res.count > 0){
      context.patchState({Issues:res});
      this.progress.hide();

    } 
   
    return res;
 });
 
}
@Action(GetIssueById)
public getIssueById(context:StateContext<IssueStateModel>,{id}:GetIssueById){
  this.progress.show();
 return this.http.get(`${this.apiUrl}/issues/${id}`,{headers}).pipe().subscribe((res:any)=>{
   if(res){
      const state = context.getState()
      context.patchState({Issue:res}); 
      this.progress.hide();
     
    } 
 return res;
 });

}
@Action(UpdateIssue)
public updateUser(context:StateContext<IssueStateModel>,{payload, issueid }:UpdateIssue){
  this.progress.show();
 return this.http.patch(`${this.apiUrl}/issues/${issueid}`,payload,{headers}).pipe().subscribe(res=>{

        if(res){
            this.store.dispatch(new GetIssueById(issueid));
            this.toastr.success('Updated SuccessFully');
            this.progress.hide();
       
          } 
         return res;
    });
   
}
@Action(ClearIssue)
public clear(context:StateContext<IssueStateModel>){
 context.patchState({Issue:null});
}

  }