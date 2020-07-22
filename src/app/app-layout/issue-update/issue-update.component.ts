import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IssueModel } from '../../models/issue.model';
import { IssueService } from 'src/app/services/issue.service';
import { FormControl } from '@angular/forms';
import { Assign } from 'src/app/models/assign.model';

@Component({
  selector: 'app-issue-update',
  templateUrl: './issue-update.component.html',
  styleUrls: ['./issue-update.component.scss']
})
export class IssueUpdateComponent implements OnInit , OnDestroy {
  @Select(state =>state.Issue_state_token.Issue) issue$:Observable<IssueModel>;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  currentIssue:IssueModel;
  status = new FormControl();
  constructor(private issue:IssueService) { }
  ngOnInit(): void {
    this.issue$.subscribe(res=>{
      if(res){
           this.currentIssue = res;
           this.status.setValue(this.currentIssue.status);
      }
    });
  }
  update(){
    let payload:any[] = [];
    if(this.status.valid){
      payload.push(new Assign('status',this.status.value));
      this.issue.updateIssue(payload,this.currentIssue._id);
    }
    
   }
ngOnDestroy(){
this.issue.clearissue();
}
}
