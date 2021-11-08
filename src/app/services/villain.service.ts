import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Villain } from '../models/villain.model';

@Injectable({
  providedIn: 'root',
})
export class VillainService {
  // private apiUrl = 'https://613d68c694dbd600172ab8c6.mockapi.io';
  private apiUrl = 'https://swin103681990.somee.com/herodata';

  constructor(private http: HttpClient) {}

  getVillains() {
    return this.http.get<Villain[]>(`${this.apiUrl}/villains`);
  }
}
