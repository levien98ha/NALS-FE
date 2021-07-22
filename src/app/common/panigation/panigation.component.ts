import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-panigation',
  templateUrl: './panigation.component.html',
  styleUrls: ['./panigation.component.scss']
})
export class PanigationComponent implements OnInit {

  @Input() totalPage: number = 0;
  @Input() currentPage: number = 1;
  @Output() pageChangeEmit = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  pageChange(value: number) {
    this.currentPage = value;
    this.pageChangeEmit.emit(value);
  }
}
