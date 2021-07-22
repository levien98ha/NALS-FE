import { NavigationStart, Router } from '@angular/router';
import { Component, ElementRef, EventEmitter, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NotifyService } from './notify.service';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit, OnDestroy {
  flagError: boolean = false;
  classCustom: any;
  indexTmp = 0;
  data!: { header: string; data: any };
  @ViewChild('divElement') divElement!: ElementRef;
  @ViewChild('closeBtn') closeBtn!: ElementRef;

  constructor(
    public notifyService: NotifyService,
    private router: Router) {
    this.indexTmp = this.notifyService.arrPopupShow.length - 1;
    this.notifyService.indexTmp = this.indexTmp;
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationStart) {
        this.closeBtn ? this.closeBtn.nativeElement.click() : '';
      }
    });
  }

  ngOnDestroy(): void {
    let checkCloseAll = true;
    this.notifyService.arrPopupShow.forEach(element => {
      if (element) {
        checkCloseAll = false;
      }
    });
    if (checkCloseAll) {
      this.notifyService.subject.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.flagError = false;
    this.notifyService.dataPopup.subscribe((res: any) => {
      this.data = res;
      console.log(this.data)
    });
  }

  onCloseDiaLog(event: any) {
    event.stopPropagation();
    this.notifyService.indexTmp = this.indexTmp;
    this.notifyService.messErr = '';
    this.notifyService.close();
    this.notifyService.sendClickEvent(false);
  }

  pressOK() {
    let countSubject = 0;
    this.notifyService.indexTmp = this.indexTmp;
    if (this.notifyService.subject && this.notifyService.subject.observers && this.notifyService.subject.observers.length > 0) {
      countSubject = 1;
    }
    this.notifyService.sendClickEvent(true);
    if (countSubject === 0) {
      this.notifyService.close();
    }
  }
}
