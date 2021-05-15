import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {Key} from '../models/key';
import {RestRoutes} from '../constant/const';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyService extends GenericService<Key> {
  route = RestRoutes.KEY;

  findCriticalAmountKeys(): Observable<Key[]> {
    return this.http.get<Key[]>(this.route + '/critical-amount');
  }
}
