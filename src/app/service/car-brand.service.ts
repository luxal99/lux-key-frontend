import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {CarBrand} from '../models/carBrand';
import {RestRoutes} from '../constant/const';

@Injectable({
  providedIn: 'root'
})
export class CarBrandService extends GenericService<CarBrand> {
  route = RestRoutes.CAR_BRAND;
}
