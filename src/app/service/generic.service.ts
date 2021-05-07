import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RestRoutes, TOKEN_NAME} from '../constant/const';

@Injectable({
  providedIn: 'root'
})
export class GenericService<T> {

  protected route = '';

  constructor(protected http: HttpClient) {
  }

  save(entity: T): Observable<T> {
    return this.http.post<T>(`${this.route}`, entity, {
      responseType: 'json',
      headers: {Authorization: sessionStorage.getItem(TOKEN_NAME)}
    });
  }

  findById(id: number): Observable<T> {
    return this.http.get<T>(`${RestRoutes.API}${this.route}/` + id, {
      responseType: 'json',
      headers: {Authorization: sessionStorage.getItem(TOKEN_NAME)}
    });
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.route}`, {
      responseType: 'json',
      headers: {Authorization: sessionStorage.getItem(TOKEN_NAME)}
    });
  }

  update(entity: T): Observable<any> {
    return this.http.put(`${RestRoutes.API}${this.route}`, entity, {
      responseType: 'text',
      headers: {Authorization: sessionStorage.getItem(TOKEN_NAME)}
    });
  }


  delete(id: number): Observable<any> {
    return this.http.delete(`${RestRoutes.API}${this.route}/${id}`, {
      responseType: 'text',
      headers: {Authorization: sessionStorage.getItem(TOKEN_NAME)}
    });
  }


}
