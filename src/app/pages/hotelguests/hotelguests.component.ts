import { Component, Output } from '@angular/core';
import { HotelGuest } from 'src/app/models/HotelGuest';
import { HotelguestService } from 'src/app/services/hotelguest.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-hotelguests',
  templateUrl: './hotelguests.component.html',
  styleUrls: ['./hotelguests.component.scss']
})
export class HotelguestsComponent {


  showSearch: boolean = false;
  showAdd: boolean = false;

  hotelguest = {} as HotelGuest;
  hotelguests: HotelGuest[] = [];
  constructor(private hotelguestService: HotelguestService) {}

  ngOnInit() {
    this.getHotelGuests();
  }
  saveHotelGuest(form: NgForm) {
    if (this.hotelguest.hotelGuestId !== undefined) {
      this.hotelguestService.updateHotelGuest(this.hotelguest).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.hotelguestService.saveHotelGuest(this.hotelguest).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }
  getHotelGuests() {
    this.hotelguestService.getHotelGuests().subscribe((hotelguests: HotelGuest[]) => {
      this.hotelguests = hotelguests;
    });
  }

  deleteHotelGuest(hotelguest: HotelGuest) {
    this.hotelguestService.deleteHotelGuest(hotelguest).subscribe(() => {
      this.getHotelGuests();
    });
  }

  editHotelGuest(hotelguest: HotelGuest) {
    this.hotelguest = { ...hotelguest };
  }

  cleanForm(form: NgForm) {
    this.getHotelGuests();
    form.resetForm();
    this.hotelguest = {} as HotelGuest;
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  toggleAdd() {
    this.showAdd = !this.showAdd;
  }
}
