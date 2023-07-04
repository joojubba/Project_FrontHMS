import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Rate } from '../models/Rate';

@Injectable({
  providedIn: 'root'
})
export class RateService {
  url = 'https://localhost:7013/Rates/rates';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  getRates(): Observable<Rate[]> {
    return this.httpClient.get<Rate[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }
   getRateById(id: number): Observable<Rate> {
    return this.httpClient.get<Rate>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  saveRate(rate: Rate) : Observable<Rate>{
    return this.httpClient.post<Rate>(this.url, JSON.stringify(rate), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  updateRate(rate: Rate): Observable<Rate> {
    return this.httpClient.put<Rate>(this.url + '/' + rate.rateId, JSON.stringify(rate),
     this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  deleteRate(rate: Rate) {
    return this.httpClient.delete<Rate>(this.url + '/' + rate.rateId)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  addRate(rate: Rate){
    console.log(this.url, JSON.stringify(rate))
    return this.httpClient.post<Rate>(this.url, JSON.stringify(rate))
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
