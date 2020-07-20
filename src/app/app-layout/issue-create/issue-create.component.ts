import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-issue-create',
  templateUrl: './issue-create.component.html',
  styleUrls: ['./issue-create.component.scss']
})
export class IssueCreateComponent implements OnInit {
issueForm:FormGroup;
constructor(private fb:FormBuilder,
            private toastr:ToastrService){

}
  ngOnInit() {
   this.issueForm  = this.fb.group({
     name:['',Validators.required],
     place:['',Validators.required],
     city:['',Validators.required],
     address:['',Validators.required],
     pincode:['',Validators.required],
     email:['',Validators.required],
     gender:['',Validators.required],
     state:['',Validators.required],
     phone:['',Validators.required],
     issue:['',Validators.required],
     jonour:['',Validators.required],
     complexity:['',Validators.required],
   })
  }
  raiseIssue(){
    if(this.issueForm.valid){
      console.log(this.issueForm.value);
      
    }else {
      this.toastr.error('Invalid Data')
    }
  }
  reset(){
    this.issueForm.reset();
  }
  cancel(){
    if(this.issueForm.touched){

    }else{
      this.issueForm.reset();
    }
  }
}

