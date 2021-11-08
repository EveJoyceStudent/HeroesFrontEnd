import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { Hero } from '../models/hero.model';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }

  // private apiUrl = 'https://613d68c694dbd600172ab8c6.mockapi.io';
  private apiUrl = 'https://swin103681990.somee.com/herodata';

  constructor(private http: HttpClient) {}

  getHeroes() {
    return this.http.get<Hero[]>(`${this.apiUrl}/Heroes`);
  }
}
