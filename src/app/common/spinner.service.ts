import { BehaviorSubject } from 'rxjs';
import { Injectable } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private spinner: NgxSpinnerService) {
  }
  isSpinnerOpen = false;
  isSpinnerShow = new BehaviorSubject({ open: false });

  open() {
    if (!this.isSpinnerOpen) {
      this.isSpinnerOpen = true;
      this.isSpinnerShow.next({ open: this.isSpinnerOpen });
      this.spinner.show();
    }
  }

  close() {
    setTimeout(() => {
      if (this.isSpinnerOpen) {
        this.isSpinnerOpen = false;
        this.isSpinnerShow.next({ open: this.isSpinnerOpen });
        this.spinner.hide();
      }
    }, 1000);
  }

}
