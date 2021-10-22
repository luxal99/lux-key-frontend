import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { KeySubCategory } from '../../models/keySubCategory';

@Injectable({
  providedIn: 'root',
})
export class KeyBehaviorService {

  private idKeyCategory = new BehaviorSubject(0);
  private idKeySubCategory = new BehaviorSubject({} as KeySubCategory);

  constructor() {
  }

  add(idKeyCategory: number) {
    this.idKeyCategory.next(idKeyCategory);
  }

  get(): number {
    return this.idKeyCategory.value;
  }

  addKeySubCategory(idKeySubCategory: KeySubCategory) {
    this.idKeySubCategory.next(idKeySubCategory);
  }

  getIdKeySubCategory(): KeySubCategory {
    return this.idKeySubCategory.value;
  }
}
