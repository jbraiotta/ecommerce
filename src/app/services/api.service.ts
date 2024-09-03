import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProduct } from '../types/types';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url = 'https://66d61605f5859a70426851c4.mockapi.io/backend/Product/';
  http: HttpClient = inject(HttpClient);
  constructor() {}
  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url);
  }
  getProduct(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(this.url + id);
  }
}
