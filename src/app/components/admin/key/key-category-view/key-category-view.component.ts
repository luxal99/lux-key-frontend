import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewContainerRef,
} from "@angular/core";
import { KeyCategory } from "../../../../models/keyCategory";
import { KeyCategoryService } from "../../../../service/key-category.service";
import { KeyBehaviorService } from "../../../../service/util/key-behavior.service";
import { LazyLoadComponentsUtil } from "../../../../util/lazy-loading-components";
import { KeySubCategoryViewComponent } from "../key-sub-category-view/key-sub-category-view.component";

@Component({
  selector: "app-key-category-view",
  templateUrl: "./key-category-view.component.html",
  styleUrls: ["./key-category-view.component.sass"],
})
export class KeyCategoryViewComponent implements OnInit {

  lisOfCategories: KeyCategory[] = [];
  @Input() keyEntry: ViewContainerRef;
  @Output() onKeyCategorySelect = new EventEmitter();

  constructor(private keyCategoryService: KeyCategoryService,
              private keyBehaviorService: KeyBehaviorService,
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
    this.keyBehaviorService.add(idKeyCategory);
    this.loadKeySubCategories();
  }

  loadKeySubCategories(): void {
    const keySubCategoryViewComponent: ComponentRef<KeySubCategoryViewComponent> = LazyLoadComponentsUtil.loadComponent(KeySubCategoryViewComponent, this.keyEntry, this.resolver);
    keySubCategoryViewComponent.instance.keyEntry = this.keyEntry;
  }
}
