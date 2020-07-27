import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';
import { ProgressService } from '../services/progress.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,
                 private progress:ProgressService,
                  private toastr:ToastrService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if(err.status === 409) {
                this.progress.hide();
                this.toastr.error('No User Found');
            }
            if (err.status === 401) {
                // auto logout if 401 response returned from api
         
                this.authenticationService.logout();
                location.reload(true);

            }
            
            if(err.status === 500) {
                this.progress.hide();
                this.toastr.error('Service Error');
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}