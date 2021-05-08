import {Component, OnInit} from '@angular/core';
import {DefaultComponent} from '../../../../util/default-component';
import {Key} from '../../../../models/key';
import {KeyCategory} from '../../../../models/keyCategory';
import {CarBrand} from '../../../../models/carBrand';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FieldConfig} from '../../../../models/FieldConfig';
import {FormControlNames, InputTypes} from '../../../../constant/const';
import {KeyService} from '../../../../service/key.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {KeyPriceService} from '../../../../service/key-price.service';
import {KeyCategoryService} from '../../../../service/key-category.service';
import {CarBrandService} from '../../../../service/car-brand.service';

@Component({
  selector: 'app-edit-key-dialog',
  templateUrl: './edit-key-dialog.component.html',
  styleUrls: ['./edit-key-dialog.component.sass']
})
export class EditKeyDialogComponent extends DefaultComponent<Key> implements OnInit {

  listOfKeyCategories: KeyCategory[] = [];
  listOfCarBrands: CarBrand[] = [];
  keyForm = new FormGroup({
    name: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    idCurrentPrice: new FormControl(''),
    idKeySubCategory: new FormControl('', Validators.required),
    idCarModel: new FormControl('', Validators.required)
  });

  nameInputConfig: FieldConfig = {name: FormControlNames.NAME_FORM_CONTROL, type: InputTypes.TEXT, label: 'Naziv'};
  amountInputConfig: FieldConfig = {name: FormControlNames.AMOUNT_FORM_CONTROL, type: InputTypes.NUMBER, label: 'Količina'};
  codeInputConfig: FieldConfig = {name: FormControlNames.CODE_FORM_CONTROL, type: InputTypes.TEXT, label: 'Šifra'};
  priceInputConfig: FieldConfig = {name: FormControlNames.PRICE_FORM_CONTROL, type: InputTypes.NUMBER, label: 'Cena'};
  idCurrentPriceSelectConfig: FieldConfig = {name: FormControlNames.NAME_FORM_CONTROL, type: InputTypes.SELECT, label: 'Naziv'};

  constructor(private keyService: KeyService, private sb: MatSnackBar, private keyPriceService: KeyPriceService,
              public keyCategoryService: KeyCategoryService, private carBrandService: CarBrandService) {
    super(keyService);
  }

  initSnackBar(): void {
    this.setSnackBar = this.sb;
  }

  ngOnInit(): void {
    this.initSnackBar();
    this.getKeyCategories();
    this.getCarBrands();
  }


  getKeyPrices(): void {
    this.keyPriceService.getAll().subscribe((resp) => {
      this.idCurrentPriceSelectConfig.options = resp;
    });
  }

  getKeyCategories(): void {
    this.keyCategoryService.getAll().subscribe((resp) => {
      this.listOfKeyCategories = resp;
    });
  }

  getCarBrands(): void {
    this.carBrandService.getAll().subscribe((resp) => {
      this.listOfCarBrands = resp;
    });
  }


  updateKey() {

  }
}
