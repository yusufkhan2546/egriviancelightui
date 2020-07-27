import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { ProgressService } from 'src/app/services/progress.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private auth:AuthenticationService,
               private progress:ProgressService,
               private router:Router) { }

  ngOnInit(): void {
  }
  logout(){
     this.auth.logout();
  }
  changePassword(){
   this.auth.logout(true);
 
  }
}
