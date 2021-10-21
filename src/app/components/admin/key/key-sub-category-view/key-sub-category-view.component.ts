import { Component, OnInit } from '@angular/core';
import { KeySubCategory } from '../../../../models/keySubCategory';
import { KeySubCategoryService } from '../../../../service/key-sub-category.service';
import { KeyCategoryIdStoreService } from '../../../../service/util/key-category-id-store.service';

@Component({
  selector: 'app-key-sub-category-view',
  templateUrl: './key-sub-category-view.component.html',
  styleUrls: ['./key-sub-category-view.component.sass'],
})
export class KeySubCategoryViewComponent implements OnInit {

  lisOfKeySubCategories: KeySubCategory[] = [];

  constructor(private keySubCategoryService: KeySubCategoryService,
              private keyCategoryStoreIdService: KeyCategoryIdStoreService) {
  }

  ngOnInit(): void {
    this.getAllKeySubCategoryByKeyCategory();
  }

  getAllKeySubCategoryByKeyCategory(): void {
    this.keySubCategoryService.findByKeyCategory(this.keyCategoryStoreIdService.get()).subscribe((resp) => {
      this.lisOfKeySubCategories = resp;
    });
  }

}
