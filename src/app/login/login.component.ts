import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  apiUrl;
  year = new Date().getFullYear();
  loginForm:FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  constructor(private fb:FormBuilder,
               private toastr:ToastrService,
                private auth:AuthenticationService,
                private route: ActivatedRoute,
                private router:Router,
                private http:HttpClient
               ) { this.apiUrl = environment.apiUrl }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
       email:['',Validators.required],
       password:['',Validators.required]
    });
    this.auth.currentUser.subscribe(res=>{
      if(res && res.token){
      const token = res.token;
      console.log(token,'token');
     this.auth.verify(token).pipe(first()).subscribe(res=>{
          if(res.message === 'Auth Success'){
            this.router.navigate([`/user`]);
          }else {
            this.auth.logout();
          }
             
       })
      }
    });
  

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  login() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.auth.login(this.loginForm.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate([`/user`]);
                this.toastr.success('Login Success')
                this.toastr.success
            },
            error => {
                this.error = error;
                this.loading = false;
            });
}
}
