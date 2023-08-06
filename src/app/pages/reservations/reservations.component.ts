import { Component, Input, OnInit } from '@angular/core';
import { Reservation, ReservationStatus } from 'src/app/models/Reservation';
import { HotelGuest } from 'src/app/models/HotelGuest';
import { NgForm } from '@angular/forms';
import { Rate } from 'src/app/models/Rate';
import { Room } from 'src/app/models/Room';
import { HotelmanagementService } from 'src/app/services/hotelmanagement.service';

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

  constructor(private hotelmanagementService: HotelmanagementService){}

  ngOnInit() {
    this.getHotelGuests();
    this.getReservations();
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
  getReservations() {
    this.hotelmanagementService.getReservations().subscribe((reservations: Reservation[]) => {
      this.reservations = reservations;
    });
  }

  deleteReservation(reservation: Reservation) {
    this.hotelmanagementService.deleteReservation(reservation).subscribe(() => {
      this.getReservations();
    });
  }

  editReservation(reservation: Reservation) {
    this.reservation = { ...reservation };
  }

  getHotelGuests() {
    this.hotelmanagementService.getHotelGuests().subscribe((hotelguests: HotelGuest[]) => {
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
