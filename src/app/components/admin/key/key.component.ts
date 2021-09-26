import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.sass'],
})
export class KeyComponent extends DefaultComponent<KeySubCategory> implements OnInit {

  searchForm = new FormGroup({
    search: new FormControl(),
    carBrand: new FormControl(''),
  });
  searchText = '';

  carBrandSelectConfig: FieldConfig = {
    name: FormControlNames.CAR_BRAND_FORM_CONTROL,
    type: InputTypes.SELECT,
    label: 'Izaberi brend',
  };

  constructor(public keyService: KeyService, private sb: MatSnackBar, private dialog: MatDialog,
              private keySubCategoriesService: KeySubCategoryService,
              private carBrandService: CarBrandService) {
    super(keySubCategoriesService);
    this.snackBar = sb;
  }

  async ngOnInit(): Promise<void> {
    super.ngOnInit();
    await this.initCarBrandOptions();
  }


  async initCarBrandOptions(): Promise<void> {
    this.carBrandSelectConfig.options = await this.carBrandService.getAll().toPromise();
  }

  openAddKeyDialog(): void {
    DialogUtil.openDialog(AddKeyDialogComponent, DialogOptions.setDialogConfig({
      position: { top: '6%' },
      width: '30%',
    }), this.dialog).afterClosed().subscribe(() => {
      this.getAll();
    });
  }

  openEditKeyDialog(key: Key): void {
    DialogUtil.openDialog(EditKeyDialogComponent, DialogOptions.setDialogConfig({
      position: { top: '1%' },
      width: '30%',
      data: key,
    }), this.dialog).afterClosed().subscribe(() => {
      this.getAll();
    });
  }

  openKeyOverviewDialog(key: Key): void {
    DialogUtil.openDialog(KeyOverviewDialogComponent, DialogOptions.setDialogConfig({
      position: { top: '6%' },
      width: '30%',
      data: key,
    }), this.dialog);
  }

  deleteKey(id: number): void {
    this.genericSubscribe(this.keyService.delete(id), () => {
      this.getAll();
    });
  }
}
