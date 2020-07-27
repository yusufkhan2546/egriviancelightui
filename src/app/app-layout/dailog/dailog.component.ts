import { Component, OnInit, Input, AfterViewInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MailModel } from 'src/app/models/mail.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { MailService } from 'src/app/services/mail.service';
import { User } from 'src/app/models/user.model';
import { AngularEditorConfig, AngularEditorComponent } from '@kolkov/angular-editor';
import { IssueModel } from 'src/app/models/issue.model';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-dailog',
  templateUrl: './dailog.component.html',
  styleUrls: ['./dailog.component.scss']
})
export class DailogComponent implements OnInit ,AfterViewInit {
  @ViewChild('editor') Editor:AngularEditorComponent;
  @Input() mailData:MailModel ;
  @Input() Issue ;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  htmlContent=``;
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: '',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};
emailForm:FormGroup;
currentUser:User;
verificationCode=132455;
  constructor(private fb:FormBuilder,
    private toastr:ToastrService,
     private auth:AuthenticationService,
     private user:UserService) { }

  ngOnInit(): void {
   
 this.auth.currentUser.subscribe(res=>{
   if(res){
     this.currentUser = res;
   }
 })
    this.emailForm = this.fb.group({
       to:['',[Validators.required]],
       subject:['',[Validators.required]],
    });
    if(this.mailData){
      console.log('maildata',this.mailData,this.Issue,'issue');
      
     this.mapData(this.emailForm,this.mailData);
    }
   
  }
  mapData(form:FormGroup,mail:MailModel){
    form.get('to').setValue(mail.to);
    form.get('subject').setValue(mail.subject);
    this.htmlContent = mail.html;
  }
  sendMail1(){
    if(this.emailForm.valid &&this.htmlContent ){
          const mail =  new MailModel();
          mail.html = this.htmlContent
          mail.subject = this.emailForm.get('subject').value;
          mail.to = this.emailForm.get('to').value;
          mail.text = 'hello';
    this.user.sendMail(this.currentUser._id,mail);
    this.emailForm.reset();
    this.closeModal();
    }else{
          this.toastr.error('Somethinf wrong')
    }
  }
  ngAfterViewInit(){

    
  }
  closeModal() {
    this.onClose.emit(true);
}
 

}
