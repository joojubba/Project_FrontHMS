import { Component } from '@angular/core';
import { Room } from 'src/app/models/Room';
import { Reservation } from 'src/app/models/Reservation';
import { NgForm } from '@angular/forms';
import { HotelGuest } from 'src/app/models/HotelGuest';
import { HotelmanagementService } from 'src/app/services/hotelmanagement.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  room = {} as Room;
  rooms: Room[] = [];

  reservation = {} as Reservation;
  reservations: Reservation[] = [];

  hotelguest = {} as HotelGuest;
  hotelguests: HotelGuest[] = [];

  constructor( private hotelmanagementService: HotelmanagementService) {}

  ngOnInit() {
    this.getRooms();
    this.getReservations();
    this.getHotelGuests();
  }

  saveCheckOut(roomNumber: number) {
    this.hotelmanagementService.updateCheckOut(roomNumber).subscribe(response => {
      alert('Check-Out realizado com sucesso!!')
    });
  }

  saveRoom(form: NgForm) {
    if (this.room.roomId !== undefined) {
      this.hotelmanagementService.updateRoom(this.room).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.hotelmanagementService.saveRoom(this.room).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }
  saveReservation(form: NgForm) {
    if (this.reservation.reservationId !== undefined) {
      this.hotelmanagementService.updateReservation(this.reservation).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.hotelmanagementService.saveReservation(this.reservation).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  getRooms() {
    this.hotelmanagementService.getRooms().subscribe((rooms: Room[]) => {
      this.rooms = rooms;
      console.log(this.room);

    });
  }
  getReservations() {
    this.hotelmanagementService.getReservations().subscribe((reservations: Reservation[]) => {
      this.reservations = reservations;
      console.log(this.room);

    });
  }
  getHotelGuests() {
    this.hotelmanagementService.getHotelGuests().subscribe((hotelguests: HotelGuest[]) => {
      this.hotelguests = hotelguests;
    });
  }

  cleanForm(form: NgForm) {
    this.getRooms();
    form.resetForm();
    this.room = {} as Room;
  }

}

