import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetIssues, GetIssueById, CreateIssue, DeleteIssue, UpdateIssue, ClearIssue } from '../actions/issue.action';
import { IssueModel } from '../models/issue.model';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  constructor(private store:Store) { }
  public getIssues(){
    return this.store.dispatch(new GetIssues());
  }
  public getIssue(id){
    return this.store.dispatch(new GetIssueById(id));
  }
  public createIssue(issue:IssueModel){
    return this.store.dispatch(new CreateIssue(issue));
  }
  public deleteIssue(id){
    return this.store.dispatch(new DeleteIssue(id));
  }
  public updateIssue(payload:any[],id:String){
    return this.store.dispatch(new UpdateIssue(payload,id))
  }
  public clearissue(){
    return this.store.dispatch(new ClearIssue());
  }
}