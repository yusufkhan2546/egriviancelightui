import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headermain',
  templateUrl: './headermain.component.html',
  styleUrls: ['./headermain.component.scss']
})
export class HeadermainComponent implements OnInit {
routevar:boolean;
  constructor(private router:Router) { }

  ngOnInit(): void {
    console.log(this.router.url);
    if(this.router.url === `/`){
      this.routevar =true;
    }else if(this.router.url === `/login`){
      this.routevar =true;
    } else {
      this.routevar =false;
    }
   
  }

}
