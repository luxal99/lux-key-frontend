import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { KeyCategory } from '../../../../models/keyCategory';
import { KeyCategoryService } from '../../../../service/key-category.service';
import { KeyCategoryIdStoreService } from '../../../../service/util/key-category-id-store.service';
import { LazyLoadComponentsUtil } from '../../../../util/lazy-loading-components';
import { KeySubCategoryViewComponent } from '../key-sub-category-view/key-sub-category-view.component';

@Component({
  selector: 'app-key-category-view',
  templateUrl: './key-category-view.component.html',
  styleUrls: ['./key-category-view.component.sass'],
})
export class KeyCategoryViewComponent implements OnInit {

  lisOfCategories: KeyCategory[] = [];
  @Input()keyEntry: ViewContainerRef
  @Output() onKeyCategorySelect = new EventEmitter();

  constructor(private keyCategoryService: KeyCategoryService,
              private keyCategoryStoreIdService: KeyCategoryIdStoreService,
              private resolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    this.getKeyCategories();
  }

  getKeyCategories(): void {
    this.keyCategoryService.getAll().subscribe((resp) => {
      this.lisOfCategories = resp;
    });
  }

  addIdKeyCategory(idKeyCategory: number) {
    this.keyCategoryStoreIdService.add(idKeyCategory);
    this.loadKeySubCategories()
  }

  loadKeySubCategories(): void {
    LazyLoadComponentsUtil.loadComponent(KeySubCategoryViewComponent, this.keyEntry, this.resolver);
  }
}
