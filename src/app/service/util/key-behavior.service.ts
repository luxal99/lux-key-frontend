import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KeyBehaviorService {

  private idKeyCategory = new BehaviorSubject(0);
  private idKeySubCategory = new BehaviorSubject(0);

  constructor() {
  }

  add(idKeyCategory: number) {
    this.idKeyCategory.next(idKeyCategory);
  }

  get(): number {
    return this.idKeyCategory.value;
  }

  addKeySubCategory(idKeySubCategory: number) {
    this.idKeySubCategory.next(idKeySubCategory);
  }

  getIdKeySubCategory(): number {
    return this.idKeySubCategory.value;
  }
}
