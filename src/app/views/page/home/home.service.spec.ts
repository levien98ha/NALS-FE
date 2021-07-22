import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';

import { HomeService } from './home.service';

describe('HomeService', () => {
  let service: HomeService;
  let comp: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be open dropdown', () => {
    expect(comp.isOrderOpen).toBe(false, 'off at first');
    comp.toogleOrderDropdown();
    expect(comp.isOrderOpen).toBe(true, 'on after click');
    comp.toogleOrderDropdown();
    expect(comp.isOrderOpen).toBe(false, 'off after second click');
  });

  it('format date should be created', () => {
    expect(comp.formatTimeBlog('')).toEqual('');
    expect(comp.formatTimeBlog('2021-09-09 13:03:23')).toEqual('2021-09-09');
    expect(comp.formatTimeBlog('2021/07/09 12:33:56')).toEqual('2021/07/09');
  });
});
