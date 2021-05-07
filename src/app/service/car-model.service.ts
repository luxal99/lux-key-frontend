import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {CarModel} from '../models/carModel';
import {RestRoutes} from '../constant/const';

@Injectable({
  providedIn: 'root'
})
export class CarModelService extends GenericService<CarModel> {
  route = RestRoutes.CAR_MODEL;
}
