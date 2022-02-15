import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { DefaultComponent } from '../../../util/default-component';
import { Key } from '../../../models/key';
import { KeyService } from '../../../service/key.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogUtil } from '../../../util/dialog-util';
import { AddKeyDialogComponent } from './add-key-dialog/add-key-dialog.component';
import { DialogOptions } from '../../../util/dialog-options';
import { EditKeyDialogComponent } from './edit-key-dialog/edit-key-dialog.component';
import { KeyOverviewDialogComponent } from './key-overview-dialog/key-overview-dialog.component';
import { FormControl, FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../models/FieldConfig';
import { FormControlNames, InputTypes } from '../../../constant/const';
import { CarBrandService } from '../../../service/car-brand.service';
import { KeySubCategoryService } from '../../../service/key-sub-category.service';
import { KeySubCategory } from '../../../models/keySubCategory';
import { KeyCategoryService } from '../../../service/key-category.service';
import { LazyLoadComponentsUtil } from '../../../util/lazy-loading-components';
import { KeySubCategoryViewComponent } from './key-sub-category-view/key-sub-category-view.component';
import { KeyCategoryViewComponent } from './key-category-view/key-category-view.component';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.sass'],
})
export class KeyComponent
  extends DefaultComponent<KeySubCategory>
  implements OnInit
{
  @ViewChild('keyEntry', { read: ViewContainerRef, static: false })
  keyEntry: ViewContainerRef;

  carBrandSelectConfig: FieldConfig = {
    name: FormControlNames.CAR_BRAND_FORM_CONTROL,
    type: InputTypes.SELECT,
    label: 'Izaberi brend',
  };

  constructor(
    public keyService: KeyService,
    private sb: MatSnackBar,
    private dialog: MatDialog,
    private keySubCategoriesService: KeySubCategoryService,
    private keyCategoryService: KeyCategoryService,
    private carBrandService: CarBrandService,
    private resolver: ComponentFactoryResolver
  ) {
    super(keySubCategoriesService);
    this.snackBar = sb;
  }

  async ngOnInit(): Promise<void> {
    super.ngOnInit();
    await this.initCarBrandOptions();
    setTimeout(() => {
      this.loadKeyCategories();
    }, 100);
  }

  async initCarBrandOptions(): Promise<void> {
    this.carBrandSelectConfig.options = await this.carBrandService
      .getAll()
      .toPromise();
  }

  loadKeyCategories(): void {
    const keyCategoryViewComponent: ComponentRef<KeyCategoryViewComponent> =
      LazyLoadComponentsUtil.loadComponent(
        KeyCategoryViewComponent,
        this.keyEntry,
        this.resolver
      );
    keyCategoryViewComponent.instance.keyEntry = this.keyEntry;
  }
}
