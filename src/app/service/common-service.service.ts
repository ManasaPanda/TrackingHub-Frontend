import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  private url = 'http://localhost:3005/auth'
  constructor(private http: HttpClient) { }

  resister(email: string, password: string, Name: string, Age: any, isAdmin: boolean): Observable<any> {

    return this.http.post(`${this.url}/register`, { email, password, Name, Age, isAdmin });
  }
  login(email,password: any): Observable<any> {
    return this.http.post(`${this.url}/login`, { email,password });
  }
  verifyAdminRef(referalCode: string): Observable<any> {
    console.log(referalCode);

    return this.http.post(`${this.url}/verifyRef`, { referalCode });
  }
}
