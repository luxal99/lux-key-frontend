import {Component, OnInit} from '@angular/core';
import {DefaultComponent} from '../../../util/default-component';
import {Key} from '../../../models/key';
import {KeyService} from '../../../service/key.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {DialogUtil} from '../../../util/dialog-util';
import {AddKeyDialogComponent} from './add-key-dialog/add-key-dialog.component';
import {DialogOptions} from '../../../util/dialog-options';
import {EditKeyDialogComponent} from './edit-key-dialog/edit-key-dialog.component';
import {KeyOverviewDialogComponent} from './key-overview-dialog/key-overview-dialog.component';
import {FormControl, FormGroup} from '@angular/forms';
import {FieldConfig} from '../../../models/FieldConfig';
import {FormControlNames, InputTypes} from '../../../constant/const';
import {map} from 'rxjs/operators';
import {CarBrandService} from '../../../service/car-brand.service';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.sass']
})
export class KeyComponent extends DefaultComponent<Key> implements OnInit {

  searchForm = new FormGroup({
    search: new FormControl(),
    carBrand: new FormControl('')
  });
  searchText = '';

  carBrandSelectConfig: FieldConfig = {
    name: FormControlNames.CAR_BRAND_FORM_CONTROL,
    type: InputTypes.SELECT,
    label: 'Izaberi brend'
  };

  constructor(private keyService: KeyService, private sb: MatSnackBar, private dialog: MatDialog,
              private carBrandService: CarBrandService) {
    super(keyService);
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
      position: {top: '6%'},
      width: '30%'
    }), this.dialog).afterClosed().subscribe(() => {
      this.getAll();
    });
  }

  openEditKeyDialog(key: Key): void {
    DialogUtil.openDialog(EditKeyDialogComponent, DialogOptions.setDialogConfig({
      position: {top: '1%'},
      width: '30%',
      data: key
    }), this.dialog).afterClosed().subscribe(() => {
      this.getAll();
    });
  }

  openKeyOverviewDialog(key: Key): void {
    DialogUtil.openDialog(KeyOverviewDialogComponent, DialogOptions.setDialogConfig({
      position: {top: '6%'},
      width: '30%',
      data: key
    }), this.dialog);
  }

  filterByCarBrand(): void {
    console.log('OVDE');
    this.keyService.getAll()
      .pipe(map(value => value.filter((key) => key.idCarModel.idCarBrand.id ===
        this.searchForm.get(FormControlNames.CAR_BRAND_FORM_CONTROL).value.id)))
      .subscribe((resp) => {
        this.listOfItems = resp;
      });
  }
}
