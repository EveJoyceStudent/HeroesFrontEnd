import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../models/result.model';

@Injectable()
export class ResultService {
  // private apiUrl = 'https://613d68c694dbd600172ab8c6.mockapi.io';
  private apiUrl = 'https://swin103681990.somee.com/herodata';

  constructor(private http: HttpClient) {}

  getResults() {
    return this.http.get<Result[]>(`${this.apiUrl}/Game`);
  }

  postResult(newResult: Result) {
    return this.http.post<Result>(`${this.apiUrl}/Game`, newResult);
  }
}
