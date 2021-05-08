import {Injectable} from '@angular/core';
import {GenericService} from './generic.service';
import {KeySubCategory} from '../models/keySubCategory';
import {RestRoutes} from '../constant/const';

@Injectable({
  providedIn: 'root'
})
export class KeySubCategoryService extends GenericService<KeySubCategory> {
  route = RestRoutes.KEY_SUB_CATEGORY;
}
