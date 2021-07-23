import { SpinnerService } from './../../../common/spinner.service';
import { NotifyService } from './../../../common/notify/notify.service';
import { Utilities } from './../../../common/utilities';
import { BlogDetailsService } from './blog-details.service';
import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/common/constants/constants';
import { Message } from 'src/app/config/message/message';
import { IBlog } from 'src/app/common/interface';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {

  constructor(
    private blogDetailService: BlogDetailsService,
    private util: Utilities,
    private notifyService: NotifyService,
    private spinnerService: SpinnerService
  ) { }

  idBlog: string = '';
  data: IBlog = {
    id: "",
    createdAt: "",
    title: "",
    image: "",
    content: ""
  };
  ngOnInit(): void {
    const url = window.location.href;
    this.idBlog = url.slice(url.lastIndexOf('/') + 1, url.length);
    this.getBlogById();
  }

  getBlogById() {
    this.spinnerService.open();
    this.blogDetailService.getBlogDetailById(this.idBlog).subscribe((res: any) => {
      if (res) {
        this.data = res;
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

  formatTimeBlog(date: string | undefined) {
    if (date) return 'Create at: ' + this.util.formatYYYYMMDD(date);
    return '';
  }

}
