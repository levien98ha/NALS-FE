import { Message } from 'src/app/config/message/message';
import { Constants } from './../constants/constants';
import { SpinnerService } from './../spinner.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, RouterState, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotifyService } from '../notify/notify.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private notifyService: NotifyService,
    public spinnerService: SpinnerService,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 403) {
        if (this.spinnerService) {
          this.spinnerService.close();
        }
        this.notifyService.open(Constants.POPUP_ERROR, Message.MSE00003).subscribe(res => {
          this.notifyService.close();
        });
      } else if (error.status === 500) {
        if (this.spinnerService) {
          this.spinnerService.close();
        }
        this.router.navigate(['/errors']);
      } else if (error.status === 404){
        if (this.spinnerService) {
          this.spinnerService.close();
        }
        this.showPopup(Message.MSE00001);
      }
      return throwError(error);
    }));
  }

  showPopup(error: string) {
    this.notifyService.open(Constants.POPUP_ERROR, error).subscribe(res => {
      this.notifyService.close();
    });
  }
}
