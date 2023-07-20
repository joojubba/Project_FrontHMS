import { Component, Input, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/Reservation';
import { HotelGuest } from 'src/app/models/HotelGuest';
import { ReservationService } from 'src/app/services/reservation.service';
import { HotelguestService } from 'src/app/services/hotelguest.service';
import { NgForm } from '@angular/forms';
import { RoomService } from 'src/app/services/room.service';
import { Room } from 'src/app/models/Room';


@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})

export class CheckinComponent {

  room = {} as Room;
  rooms: Room[] = [];

  reservation = {} as Reservation;
  reservations: Reservation[] = [];

  hotelguest = {} as HotelGuest;
  hotelguests: HotelGuest[] = [];

  constructor( private reservationService: ReservationService, private roomService: RoomService, private hotelguestService: HotelguestService) {}


  ngOnInit() {
    this.getRooms();
    this.getReservations();
    this.getHotelGuests();
  }

  saveCheckIn(roomNumber: number, reservationId: number) {
    this.roomService.updateCheckIn(roomNumber, reservationId).subscribe(response => {
      alert('Check-In realizado com sucesso!!')
    });
  }

  saveRoom(form: NgForm) {
    if (this.room.roomId !== undefined) {
      this.roomService.updateRoom(this.room).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.roomService.saveRoom(this.room).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }
  saveReservation(form: NgForm) {
    if (this.reservation.reservationId !== undefined) {
      this.reservationService.updateReservation(this.reservation).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.reservationService.saveReservation(this.reservation).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  getRooms() {
    this.roomService.getRooms().subscribe((rooms: Room[]) => {
      this.rooms = rooms;
      console.log(this.room);

    });
  }
  getReservations() {
    this.reservationService.getReservations().subscribe((reservations: Reservation[]) => {
      this.reservations = reservations;
      console.log(this.room);

    });
  }
  getHotelGuests() {
    this.hotelguestService.getHotelGuests().subscribe((hotelguests: HotelGuest[]) => {
      this.hotelguests = hotelguests;
    });
  }

  cleanForm(form: NgForm) {
    this.getReservations();
    form.resetForm();
    this.reservation = {} as Reservation;
  }

}


