import { Utilities } from './../../../common/utilities';
import { PathAPI } from './../../../config/path-api';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  currentPage = 1;
  constructor(
    private httpClient: HttpClient
  ) { }

  getTotalPage(object: any) {
    let param = new HttpParams()
    .set('sortby', object.sortby)
    .set('order', object.orderby)
    .set('title', object.title);
    return this.httpClient.get<any>(PathAPI.PATH_GET_BLOGS, {params: param});
  }

  getListBlog(object: any) {
    let param = new HttpParams()
    .set('sortby', object.sortby)
    .set('order', object.orderby)
    .set('title', object.title)
    .set('page', object.page)
    .set('limit', object.limit);
    return this.httpClient.get<any>(PathAPI.PATH_GET_BLOGS, {params: param});
  }
}
