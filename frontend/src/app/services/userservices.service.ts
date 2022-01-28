import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserStories } from '../models/user-stories.model';
import { Observable } from 'rxjs';

const _url = 'http://localhost:5000';

@Injectable({
  providedIn: 'root'
})
export class UserservicesService {

  constructor(private _http: HttpClient) { }


  // getAll(): Observable<UserStories[]> {
  //   return this._http.get<UserStories[]>(_url);
  // }
  
  create(data: any): Observable<any> {
    return this._http.post<any>(`${_url}/uploadFile`, data);
  }

  // update(id: any, data: any): Observable<any> {
  //   return this._http.put(`${_url}/${id}`, data);
  // }

  // delete(id: any): Observable<any> {
  //   return this._http.delete(`${_url}/${id}`);
  // }

  // searchByUsername(username: any): Observable<UserStories[]> {
  //   return this._http.get<UserStories[]>(`${_url}?username=${username}`);
  // }

  // getSinglePost(id: any): Observable<UserStories> {
  //   return this._http.get(`${_url}/${id}`);
  // }

}
