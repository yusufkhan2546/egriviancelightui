import { Injectable, ViewChild } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  constructor() { }
  public show(){
    const ele = document.getElementById('Progress') as HTMLElement;
    ele.style.display='block';
  }
  public hide(){
    const ele = document.getElementById('Progress') as HTMLElement;
    ele.style.display='none';
  }
}
