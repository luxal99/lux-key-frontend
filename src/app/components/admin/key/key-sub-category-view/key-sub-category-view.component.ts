import { Component, ComponentFactoryResolver, Input, OnInit, ViewContainerRef } from '@angular/core';
import { KeySubCategory } from '../../../../models/keySubCategory';
import { KeySubCategoryService } from '../../../../service/key-sub-category.service';
import { KeyBehaviorService } from '../../../../service/util/key-behavior.service';
import { LazyLoadComponentsUtil } from '../../../../util/lazy-loading-components';
import { KeyCardComponent } from '../key-card/key-card.component';

@Component({
  selector: 'app-key-sub-category-view',
  templateUrl: './key-sub-category-view.component.html',
  styleUrls: ['./key-sub-category-view.component.sass'],
})
export class KeySubCategoryViewComponent implements OnInit {

  @Input() keyEntry: ViewContainerRef;
  lisOfKeySubCategories: KeySubCategory[] = [];

  constructor(private keySubCategoryService: KeySubCategoryService,
              private keyBehaviorService: KeyBehaviorService,
              private resolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    this.getAllKeySubCategoryByKeyCategory();
  }

  getAllKeySubCategoryByKeyCategory(): void {
    this.keySubCategoryService.findByKeyCategory(this.keyBehaviorService.get()).subscribe((resp) => {
      this.lisOfKeySubCategories = resp;
    });
  }

  addKeySubCategory(idKeySubCategory: number): void {
    this.keyBehaviorService.addKeySubCategory(idKeySubCategory);
    this.loadKeyCardView();
  }

  loadKeyCardView(): void {
    LazyLoadComponentsUtil.loadComponent(KeyCardComponent, this.keyEntry, this.resolver);
  }

}
