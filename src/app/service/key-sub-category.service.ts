import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { KeySubCategory } from '../models/keySubCategory';
import { RestRoutes } from '../constant/const';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KeySubCategoryService extends GenericService<KeySubCategory> {
  route = RestRoutes.KEY_SUB_CATEGORY;

  findByKeyCategory(idKeyCategory: number): Observable<KeySubCategory[]> {
    return this.http.get<KeySubCategory[]>(this.route + '/by-key-category', {
      params: { idKeyCategory },
      responseType: 'json',
    });
  }
}
