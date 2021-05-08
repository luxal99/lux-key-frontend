import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {Key} from '../models/key';
import {RestRoutes} from '../constant/const';

@Injectable({
  providedIn: 'root'
})
export class KeyService extends GenericService<Key> {
  route = RestRoutes.KEY;
}
