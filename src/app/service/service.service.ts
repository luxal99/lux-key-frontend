import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {Service} from '../models/service';
import {RestRoutes} from '../constant/const';

@Injectable({
  providedIn: 'root'
})
export class ServiceService extends GenericService<Service> {
  route = RestRoutes.SERVICE;
}
