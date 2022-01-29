import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const base_url = 'http://localhost:5000';

@Injectable({
  providedIn: 'root',
})
export class ProfileServiceService {
  constructor(private http: HttpClient) {}

  getUserPosts(userId: any): Observable<any> {
    return this.http.get(`${base_url}/posts/${userId}`);
  }
}
