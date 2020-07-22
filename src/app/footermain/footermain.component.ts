import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footermain',
  templateUrl: './footermain.component.html',
  styleUrls: ['./footermain.component.scss']
})
export class FootermainComponent implements OnInit {
year = new Date().getFullYear();
  constructor() { }

  ngOnInit(): void {
  }

}
