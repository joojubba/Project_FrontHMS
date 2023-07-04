import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HotelGuest } from '../models/HotelGuest';

@Injectable({
  providedIn: 'root'
})
export class HotelguestService {
  url = 'https://localhost:7013/HotelGuests/hotelGuests';

  constructor(private httpClient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getHotelGuests(): Observable<HotelGuest[]> {
    return this.httpClient.get<HotelGuest[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

   getHotelGuestById(HotelGuestId: number): Observable<HotelGuest> {
    return this.httpClient.get<HotelGuest>(this.url + '/' + HotelGuestId)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  saveHotelGuest(hotelguest: HotelGuest) : Observable<HotelGuest>{
    return this.httpClient.post<HotelGuest>(this.url, JSON.stringify(hotelguest), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }


  updateHotelGuest(hotelguest: HotelGuest): Observable<HotelGuest> {
    return this.httpClient.put<HotelGuest>(this.url + '/' + hotelguest.hotelGuestId, JSON.stringify(hotelguest),
     this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  deleteHotelGuest(hotelguest: HotelGuest) {
    return this.httpClient.delete<HotelGuest>(this.url + '/' + hotelguest.hotelGuestId)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  addHotelGuest(hotelguest: HotelGuest){
    console.log(this.url, JSON.stringify(hotelguest))
    return this.httpClient.post<HotelGuest>(this.url, JSON.stringify(hotelguest))
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
