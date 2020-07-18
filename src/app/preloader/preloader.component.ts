import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(document).ready(function () {
      var $preloader = $('.index-page');
    if($preloader.length) {
        $preloader.delay(1600).slideUp();
    }
    });
  }

}
