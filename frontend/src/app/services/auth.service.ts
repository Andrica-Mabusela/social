import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { JwtHelperService } from '@auth0/angular-jwt';

const baseUrl = 'http://localhost:5000/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}/register`, user, {
      withCredentials: true, 
    });
  }

  loginUser(user: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}/login`, user, {
      withCredentials: true,
    });
  }


  public isAuthenticated() : boolean {
    const token: any = localStorage.getItem('token')

    // check whether token is expired and return true or false
    return !this.jwtHelper.isTokenExpired(token)
  }

 

}
