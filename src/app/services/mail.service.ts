import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
let Email:any;


@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private store:Store) { }

}
