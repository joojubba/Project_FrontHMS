import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Reservation } from '../models/Reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  url = 'https://localhost:7013/Reservations/reservations';

  constructor(private httpClient: HttpClient) { }

   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


  checkIn(roomNumber: number, id: number) {
    const url = `${this.url}/checkin?roomNumber=${roomNumber}`;
    return this.httpClient.post(url, id);
  }


  getReservations(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }


   getReservationById(id: number): Observable<Reservation> {
    return this.httpClient.get<Reservation>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  saveReservation(reservation: Reservation) : Observable<Reservation>{
    console.log(this.saveReservation)
    return this.httpClient.post<Reservation>(this.url, JSON.stringify(reservation), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateReservation(reservation: Reservation): Observable<Reservation> {
    return this.httpClient.put<Reservation>(this.url + '/' + reservation.reservationId, JSON.stringify(reservation),
     this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  deleteReservation(reservation: Reservation) {
    return this.httpClient.delete<Reservation>(this.url + '/' + reservation.reservationId)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  addReservation(reservation: Reservation){
    console.log(this.url, JSON.stringify(reservation))
    return this.httpClient.post<Reservation>(this.url, JSON.stringify(reservation))
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
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
