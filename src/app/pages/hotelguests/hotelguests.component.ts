import { Component, Output } from '@angular/core';
import { HotelGuest } from 'src/app/models/HotelGuest';
import { NgForm } from '@angular/forms';
import { HotelmanagementService } from 'src/app/services/hotelmanagement.service';


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
  constructor( private hotelmanagementService: HotelmanagementService) {}

  ngOnInit() {
    this.getHotelGuests();
  }
  saveHotelGuest(form: NgForm) {
    if (this.hotelguest.hotelGuestId !== undefined) {
      this.hotelmanagementService.updateHotelGuest(this.hotelguest).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.hotelmanagementService.saveHotelGuest(this.hotelguest).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }
  getHotelGuests() {
    this.hotelmanagementService.getHotelGuests().subscribe((hotelguests: HotelGuest[]) => {
      this.hotelguests = hotelguests;
    });
  }

  deleteHotelGuest(hotelguest: HotelGuest) {
    this.hotelmanagementService.deleteHotelGuest(hotelguest).subscribe(() => {
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
