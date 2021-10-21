import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KeyCategoryIdStoreService {

  private idKeyCategory = new BehaviorSubject(0);

  constructor() {
  }

  add(idKeyCategory: number) {
    this.idKeyCategory.next(idKeyCategory);
  }

  get(): number {
    return this.idKeyCategory.value;
  }
}
