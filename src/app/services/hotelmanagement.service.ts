import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Room, RoomStatus } from '../models/Room';
import { HotelGuest } from '../models/HotelGuest';
import { Rate } from '../models/Rate';
import { Reservation } from '../models/Reservation';
import { Payment } from '../models/Payment';

@Injectable({
  providedIn: 'root'
})
export class HotelmanagementService {

  urlRoom = 'https://localhost:7013/Rooms/rooms';
  urlRate = 'https://localhost:7013/Rates/rates';
  urlHotelGuest = 'https://localhost:7013/HotelGuests/hotelGuests';
  urlReservation = 'https://localhost:7013/Reservations/reservations';
  urlHousekeeping = 'https://localhost:7013/housekeeping';
  urlCheckIn = 'https://localhost:7013/CheckIn';
  urlCheckOut = 'https://localhost:7013/CheckOut';
  urlPayment = 'https://localhost:7013/Payments';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getHotelGuests(): Observable<HotelGuest[]> {
    return this.httpClient.get<HotelGuest[]>(this.urlHotelGuest)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

   getHotelGuestById(HotelGuestId: number): Observable<HotelGuest> {
    return this.httpClient.get<HotelGuest>(this.urlHotelGuest + '/' + HotelGuestId)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  saveHotelGuest(hotelguest: HotelGuest) : Observable<HotelGuest>{
    return this.httpClient.post<HotelGuest>(this.urlHotelGuest, JSON.stringify(hotelguest), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }


  updateHotelGuest(hotelguest: HotelGuest): Observable<HotelGuest> {
    return this.httpClient.put<HotelGuest>(this.urlHotelGuest + '/' + hotelguest.hotelGuestId, JSON.stringify(hotelguest),
     this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  deleteHotelGuest(hotelguest: HotelGuest) {
    return this.httpClient.delete<HotelGuest>(this.urlHotelGuest + '/' + hotelguest.hotelGuestId)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  addHotelGuest(hotelguest: HotelGuest){
    console.log(this.urlHotelGuest, JSON.stringify(hotelguest))
    return this.httpClient.post<HotelGuest>(this.urlHotelGuest, JSON.stringify(hotelguest))
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getRates(): Observable<Rate[]> {
    return this.httpClient.get<Rate[]>(this.urlRate)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }
   getRateById(id: number): Observable<Rate> {
    return this.httpClient.get<Rate>(this.urlRate + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  saveRate(rate: Rate) : Observable<Rate>{
    return this.httpClient.post<Rate>(this.urlRate, JSON.stringify(rate), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  updateRate(rate: Rate): Observable<Rate> {
    return this.httpClient.put<Rate>(this.urlRate + '/' + rate.rateId, JSON.stringify(rate),
     this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  deleteRate(rate: Rate) {
    return this.httpClient.delete<Rate>(this.urlRate + '/' + rate.rateId)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  addRate(rate: Rate){
    console.log(this.urlRate, JSON.stringify(rate))
    return this.httpClient.post<Rate>(this.urlRate, JSON.stringify(rate))
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }


  checkIn(roomNumber: number, id: number) {
    const url = `${this.urlCheckIn}/checkin?roomNumber=${roomNumber}`;
    return this.httpClient.post(url, id);
  }


  getReservations(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(this.urlReservation)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }


   getReservationById(id: number): Observable<Reservation> {
    return this.httpClient.get<Reservation>(this.urlReservation + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  saveReservation(reservation: Reservation) : Observable<Reservation>{
    console.log(this.saveReservation)
    return this.httpClient.post<Reservation>(this.urlReservation, JSON.stringify(reservation), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateReservation(reservation: Reservation): Observable<Reservation> {
    return this.httpClient.put<Reservation>(this.urlReservation + '/' + reservation.reservationId, JSON.stringify(reservation),
     this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  deleteReservation(reservation: Reservation) {
    return this.httpClient.delete<Reservation>(this.urlReservation + '/' + reservation.reservationId)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  addReservation(reservation: Reservation){
    console.log(this.urlReservation, JSON.stringify(reservation))
    return this.httpClient.post<Reservation>(this.urlReservation, JSON.stringify(reservation))
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getRooms(): Observable<Room[]> {
    return this.httpClient.get<Room[]>(this.urlRoom)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

   getRoomById(id: number): Observable<Room> {
    return this.httpClient.get<Room>(this.urlRoom + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  saveRoom(room: Room) : Observable<Room>{
    return this.httpClient.post<Room>(this.urlRoom, JSON.stringify(room), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateRoom(room: Room): Observable<Room> {
    return this.httpClient.put<Room>(this.urlRoom + '/' + room.roomId, JSON.stringify(room),
     this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  deleteRoom(room: Room) {
    return this.httpClient.delete<Room>(this.urlRoom + '/' + room.roomId)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  addRoom(room: Room){
    console.log(this.urlRoom, JSON.stringify(room))
    return this.httpClient.post<Room>(this.urlRoom, JSON.stringify(room))
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  updateRoomStatus(roomNumber: number, status: RoomStatus) {
    return this.httpClient.post(
      `${this.urlHousekeeping}/${roomNumber}`,
      status,
    );
  }

  updateCheckIn(roomNumber: number, reservationId: number) {
    return this.httpClient.post(
      `${this.urlCheckIn}/checkin?roomNumber=${roomNumber}`,
      reservationId,
    );
  }

  updateCheckOut(roomNumber: number) {
    return this.httpClient.post(
      `${this.urlCheckOut}/checkouts/${roomNumber}`,
      null,
    );
  }

  getPayments(): Observable<Payment[]> {
    return this.httpClient.get<Payment[]>(`${this.urlPayment}/payments`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  savePayment(reservationId: number, payment: Payment) {
    return this.httpClient.post(`${this.urlPayment}/${reservationId}/payments`, payment);
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Código do erro: ${error.status}, ` +
      `mensagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
