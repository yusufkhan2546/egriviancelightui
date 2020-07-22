import { Component, OnInit, ViewChild } from '@angular/core';
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

declare var $:any;

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @Select(state =>state.Issue_state_token.Issues) issues$:Observable<Result>
  displayedColumns: string[] = ['position', 'name', 'weight','symbol1', 'symbol','symbol2'];
  dataSource:MatTableDataSource<IssueModel>;
  
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

}




