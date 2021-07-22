import { Injectable } from '@angular/core';
import { ApplicationProperties } from 'src/app/config/application.properties';

@Injectable({
  providedIn: 'root'
})
export class DefaultLayoutService {

  objectBlogSearch = {
    page: 1,
    limit: ApplicationProperties.RECORD_IN_PAGE,
    sortby: 'createdAt',
    orderby: 'desc',
    title: ''
  }
  constructor() { }
}
