import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PathAPI } from 'src/app/config/path-api';

@Injectable({
  providedIn: 'root'
})
export class BlogDetailsService {

  constructor(private httpClient: HttpClient) { }

  getBlogDetailById(id: string) {
    return this.httpClient.get<any>(PathAPI.PATH_GET_BLOGS.concat(`/${id}`));
  }
}
