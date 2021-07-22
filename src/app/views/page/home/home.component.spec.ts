import { Message } from 'src/app/config/message/message';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should be open dropdown', () => {
    expect(component.isOrderOpen).toBe(false, 'off at first');
    component.toogleOrderDropdown();
    expect(component.isOrderOpen).toBe(true, 'on after click');
    component.toogleOrderDropdown();
    expect(component.isOrderOpen).toBe(false, 'off after second click');
  });

  it('format date should be created', () => {
    expect(component.formatTimeBlog('')).toEqual('');
    expect(component.formatTimeBlog('2021-09-09 13:03:23')).toEqual('2021-09-09');
    expect(component.formatTimeBlog('2021/07/09 12:33:56')).toEqual('2021/07/09');
  });

  it('no data shoult be inner message', () => {
    component.data = [];
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('#v-no-data-display');
    expect(el.textContent).toContain(Message.MSI00001);
  });
});
