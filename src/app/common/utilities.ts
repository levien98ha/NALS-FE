import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Utilities {
  formatYYYYMMDD(date: string) {
    if (date) return date.substr(0, 10);
    return '';
  }
}
