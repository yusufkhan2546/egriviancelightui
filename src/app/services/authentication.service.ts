import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { Login } from '../models/login.model';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    apiUrl;
    constructor(private http: HttpClient,
                 private router:Router,
                ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.apiUrl = environment.apiUrl;
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(payload:Login) {
        return this.http.post<any>(`${this.apiUrl}/users/login`, payload)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user.user && user.user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user.user));
                    this.currentUserSubject.next(user.user);
                }

                return user.user;
            }));
    }
    verify(payload){
        return this.http.post<any>(`${this.apiUrl}/users/verify`, payload)
        .pipe(map(res=>{
            if(res){
                return res;
               }
        }  
        ));
}   
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate([`/`]);
    }
}