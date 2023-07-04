import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Room, RoomStatus } from '../models/Room';
import { Reservation } from '../models/Reservation';


@Injectable({
  providedIn: 'root'
})
export class RoomService {
  url = 'https://localhost:7013/Rooms/rooms';
  urlHousekeeping = 'https://localhost:7013/housekeeping';
  urlCheckIn = 'https://localhost:7013/CheckIn'
  urlCheckOut = 'https://localhost:7013/CheckOut'

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getRooms(): Observable<Room[]> {
  return this.httpClient.get<Room[]>(this.url)
    .pipe(
      retry(2),
      catchError(this.handleError))
}

 getRoomById(id: number): Observable<Room> {
  return this.httpClient.get<Room>(this.url + '/' + id)
    .pipe(
      retry(2),
      catchError(this.handleError))
}

saveRoom(room: Room) : Observable<Room>{
  return this.httpClient.post<Room>(this.url, JSON.stringify(room), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

updateRoom(room: Room): Observable<Room> {
  return this.httpClient.put<Room>(this.url + '/' + room.roomId, JSON.stringify(room),
   this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
}

deleteRoom(room: Room) {
  return this.httpClient.delete<Room>(this.url + '/' + room.roomId)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
}

addRoom(room: Room){
  console.log(this.url, JSON.stringify(room))
  return this.httpClient.post<Room>(this.url, JSON.stringify(room))
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
