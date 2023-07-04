import { Component, Input, OnInit } from '@angular/core';
import { Reservation, ReservationStatus } from 'src/app/models/Reservation';
import { ReservationService } from 'src/app/services/reservation.service';
import { HotelGuest } from 'src/app/models/HotelGuest';
import { HotelguestService } from 'src/app/services/hotelguest.service';
import { NgForm } from '@angular/forms';
import { RateService } from 'src/app/services/rate.service';
import { Rate } from 'src/app/models/Rate';
import { Room } from 'src/app/models/Room';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
 })
 export class ReservationsComponent implements OnInit {

  hotelguest = {} as HotelGuest;
  hotelguests: HotelGuest[] = [];

  reservation = {} as Reservation;
  reservations: Reservation[] = [];

  rate = {} as Rate;
  rates: Rate[] = [];

  showSearch: boolean = false;
  showAdd: boolean = false;

  room = {} as Room;
  rooms: Room[] = [];

  reservationStatus = ReservationStatus;

  constructor(private hotelguestService: HotelguestService, private reservationService: ReservationService, private rateService: RateService, private roomService: RoomService){}

  ngOnInit() {
    this.getHotelGuests();
    this.getReservations();
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
  getReservations() {
    this.reservationService.getReservations().subscribe((reservations: Reservation[]) => {
      this.reservations = reservations;
    });
  }

  deleteReservation(reservation: Reservation) {
    this.reservationService.deleteReservation(reservation).subscribe(() => {
      this.getReservations();
    });
  }

  editReservation(reservation: Reservation) {
    this.reservation = { ...reservation };
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
  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  toggleAdd() {
   this.showAdd = !this.showAdd;
  }

 }
