import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';

const baseUrl = "http://localhost:5000/auth"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}/register`, user)
  }

  loginUser(user: any) : Observable<any>{
    return this.http.post<any>(`${baseUrl}/login`, user)
  }

}
