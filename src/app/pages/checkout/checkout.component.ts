import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { RoomService } from 'src/app/services/room.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { Room } from 'src/app/models/Room';
import { Reservation } from 'src/app/models/Reservation';
import { NgForm } from '@angular/forms';

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

  constructor(private reservationService: ReservationService, private roomService: RoomService) {}

  ngOnInit() {
    this.getRooms();
    this.getReservations();
  }

  saveCheckOut(roomNumber: number) {
    this.roomService.updateCheckOut(roomNumber).subscribe(response => {
      alert('Check-Out realizado com sucesso!!')
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

  cleanForm(form: NgForm) {
    this.getRooms();
    form.resetForm();
    this.room = {} as Room;
  }

}

