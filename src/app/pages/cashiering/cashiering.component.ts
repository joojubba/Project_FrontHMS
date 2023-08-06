import { Component } from '@angular/core';
import { Payment } from 'src/app/models/Payment';
import { Reservation, ReservationStatus } from 'src/app/models/Reservation';
import { Room } from 'src/app/models/Room';
import { NgForm } from '@angular/forms';
import { HotelmanagementService } from 'src/app/services/hotelmanagement.service';
import { HotelGuest } from 'src/app/models/HotelGuest';

@Component({
  selector: 'app-cashiering',
  templateUrl: './cashiering.component.html',
  styleUrls: ['./cashiering.component.css']
})
export class CashieringComponent {

  payment = {} as Payment;
  payments: Payment[] = [];

  reservation = {} as Reservation;
  reservations: Reservation[] = [];


  hotelguest = {} as HotelGuest;
  hotelguests: HotelGuest[] = [];

  room = {} as Room;
  rooms: Room[] = [];

  constructor( private hotelmanagementService: HotelmanagementService) {}

  ngOnInit() {
    this.getPayments();
  }

  onSavePayment(reservationId: number, payment: Payment) {
    this.hotelmanagementService.savePayment(reservationId, payment).subscribe(response => {
      alert('Pagamento realizado com sucesso!!')
    });
  }

  getPayments() {
    this.hotelmanagementService.getPayments().subscribe((payments: Payment[]) => {
      this.payments = payments;
    });
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
      console.log(this.room);

    });
  }

  cleanForm(form: NgForm) {
    this.getPayments();
    form.resetForm();
    this.payment = {} as Payment;
  }

}
