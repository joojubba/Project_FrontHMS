import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable(
  {
    providedIn: "root"
  }
)
export class LoginService{

  url = 'https://localhost:7013/Login';

  constructor(private httpClient: HttpClient){}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  private readonly baseUrl = environment["endPoint"];

  LoginUser(object: any)
  {
    return this.httpClient.post<any>
    (`${this.url}/autenticar/`,object);
  }

}
