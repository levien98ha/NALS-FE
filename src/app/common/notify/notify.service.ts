import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  typeRedirectScreen = 0;
  isShow = false;
  dataPopup = new BehaviorSubject({ header: '', data: '' });
  arrPopupShow: boolean[] = [];
  indexTmp = 0;
  subject: any;
  messErr: string = '';
  constructor() {
  }

  open(headerText: string, messages: string): Observable<any> {
    this.subject = new Subject<any>();
    this.dataPopup.next({ header: headerText, data: messages });
    this.isShow = true;
    this.arrPopupShow.push(true);
    return this.subject.asObservable();
  }

  close() {
    this.isShow = false;
    this.arrPopupShow.pop();
  }

  sendClickEvent(flag: any) {
    this.subject.next(flag);
  }
}
