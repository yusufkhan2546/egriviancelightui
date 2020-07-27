import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { IssueService } from '../../services/issue.service';
import { IssueModel } from '../../models/issue.model';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Result } from '../../models/result.model';
import { MatRadioChange } from '@angular/material/radio';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { MailModel } from 'src/app/models/mail.model';
import { Templates } from 'src/app/models/templates.model';
import { TextOnlyDirective } from 'src/app/directives/text-only.directive';

declare var $:any;

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnInit {
   IssueforMail =new MailModel() ;
   template = new Templates();
   Issue = new IssueModel();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @Select(state =>state.Issue_state_token.Issues) issues$:Observable<Result>
  displayedColumns: string[] = ['position', 'name', 'weight','symbol1', 'symbol','symbol2'];
  dataSource:MatTableDataSource<IssueModel>;
  mailclicked=false;
  showModal= false;
  constructor(  private issue:IssueService,

    private router:Router
                 ){
        
  }
  ngOnInit() {

    this.issue.getIssues();
   
    this.issues$.subscribe(res=>{
      if(res && res.count !==null && res.count > 0){
          this.dataSource = new MatTableDataSource<IssueModel>(res.products);
          this.dataSource.paginator = this.paginator;
      }
    });

  }
mail(data:IssueModel){
this.IssueforMail.to = data.email;
this.IssueforMail.subject = 'Update On Issue ID:'.concat(data._id);
let html = this.template.issueTemplate;
html = html.replace('{{name}}',data.name);
html = html.replace('{{status}}',data.status);
html = html.replace('{{ticket}}',data._id);
html = html.replace('{{ticket1}}',data._id);
html = html.replace('{{ticket2}}',data._id);
this.IssueforMail.html = html;
this.Issue = data;
this.showModal = true;
}
close(){
  this.mailclicked = false;
}
dynamicCols(event){
console.log(event.source.checked,event.source.value,'radio buttons');
if(event.source.checked){
   
    this.displayedColumns.splice(this.displayedColumns.length-1,0,event.source.value);
} else {
  const index = this.displayedColumns.indexOf(event.source.value)
  console.log(index);
  if(index>-1){
     this.displayedColumns.splice(index,1);
  }
}
$(document).on('click', '.dropdown-menu', function (e) {
  e.stopPropagation();
});
}
updateIssue(issue:IssueModel){
  this.issue.getIssue(issue._id);
  this.router.navigate([`/user/updateissue`])
}
modalClosed(isClosed?) {
  this.showModal = false;
}

}




