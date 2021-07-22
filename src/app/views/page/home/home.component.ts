import { DefaultLayoutService } from './../../theme/default-layout/default-layout.service';
import { Utilities } from './../../../common/utilities';
import { Message } from '../../../config/message/message';
import { Constants } from './../../../common/constants/constants';
import { SpinnerService } from './../../../common/spinner.service';
import { Router } from '@angular/router';
import { HomeService } from './home.service';
import { ApplicationProperties } from './../../../config/application.properties';
import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NotifyService } from 'src/app/common/notify/notify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('dropdownOrder', { static: false }) dropdownOrder!: ElementRef;

  constructor(
    private homeService: HomeService,
    public defaultLayoutService: DefaultLayoutService,
    private notifyService: NotifyService,
    private router: Router,
    private spinnerService: SpinnerService,
    private util: Utilities
  ) { }

  message: Message = new Message();

  objectSearchClone = {
    page: this.defaultLayoutService.objectBlogSearch.page,
    limit: ApplicationProperties.RECORD_IN_PAGE,
    sortby: 'createAt',
    orderby: 'desc',
    title: this.defaultLayoutService.objectBlogSearch.title
  }

  totalPage: number = 0;
  data: any = [];
  messInfo = '';
  ngOnInit(): void {
    this.getDataPage();
  }

  getDataPage() {
    this.spinnerService.open();
    this.homeService.getTotalPage(this.defaultLayoutService.objectBlogSearch).subscribe((res) => {
      if (res) {
        this.totalPage = Math.ceil(res.length / this.defaultLayoutService.objectBlogSearch.limit);
        if (this.totalPage === 0) {
          this.messInfo = Message.MSI00001;
        }
        this.homeService.getListBlog(this.defaultLayoutService.objectBlogSearch).subscribe((resp) => {
          if (resp) {
            this.data = resp;
            this.spinnerService.close();
          }
        }, (error) => {
          this.notifyService.open(Constants.POPUP_ERROR, Message.MSE00001).subscribe(res => {
            if (res) {
              this.notifyService.close();
              this.spinnerService.close();
            }
            this.spinnerService.close();
          })
        })
      }
    }, (error) => {
      this.notifyService.open(Constants.POPUP_ERROR, Message.MSE00001).subscribe(res => {
        if (res) {
          this.notifyService.close();
          this.spinnerService.close();
        }
        this.spinnerService.close();
      })
    })
  }

  searchBlog() {
    this.objectSearchClone.page = 1;
    this.defaultLayoutService.objectBlogSearch = JSON.parse(JSON.stringify(this.objectSearchClone));
    this.getDataPage();
  }

  pageChange(event: number) {
    this.defaultLayoutService.objectBlogSearch.page = event;
    this.objectSearchClone.page = event;
    this.getDataPage();
    this.scrollToTop();
  }

  scrollToTop() {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }

  isOrderOpen = false;
  toogleOrderDropdown() {
    if (!this.isOrderOpen) {
      this.dropdownOrder.nativeElement.style.display = 'block';
    } else {
      this.dropdownOrder.nativeElement.style.display = 'none';
    }
    this.isOrderOpen = !this.isOrderOpen;
  }

  @HostListener('document:mouseup', ['$event'])
  onGlobalClick(e: any): void {
    if(e.target !== this.dropdownOrder.nativeElement) {
      this.isOrderOpen = false;
      this.dropdownOrder.nativeElement.style.display = 'none';
    }
  }

  changeOrderby(value: string) {
    this.objectSearchClone.orderby = value;
    this.defaultLayoutService.objectBlogSearch.orderby = value;
    this.getDataPage();
  }

  blogDetail(value: number) {
    this.router.navigateByUrl(`/blogs/${value}`)
  }

  formatTimeBlog(date: string) {
    if (date) return 'Create at: ' + this.util.formatYYYYMMDD(date);
    return '';
  }
}
