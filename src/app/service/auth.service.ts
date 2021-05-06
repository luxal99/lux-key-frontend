import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {RestRoutes} from '../constant/const';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  auth(user: User): Observable<string> {
    return this.http.post(RestRoutes.USER + '/auth', user, {responseType: 'text'});
  }
}
