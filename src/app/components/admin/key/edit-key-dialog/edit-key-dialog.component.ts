import {AfterViewChecked, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
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
import {KeyPrice} from '../../../../models/keyPrice';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-key-dialog',
  templateUrl: './edit-key-dialog.component.html',
  styleUrls: ['./edit-key-dialog.component.sass']
})
export class EditKeyDialogComponent extends DefaultComponent<Key> implements OnInit, AfterViewChecked {

  listOfKeyPrices: KeyPrice[] = [];
  listOfKeyCategories: KeyCategory[] = [];
  listOfCarBrands: CarBrand[] = [];

  keyForm = new FormGroup({
    name: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    idCurrentPrice: new FormControl(''),
    idKeySubCategory: new FormControl('', Validators.required),
    idCarModel: new FormControl('', Validators.required)
  });

  keyPriceForm = new FormGroup({
    price: new FormControl('', Validators.required)
  });
  nameInputConfig: FieldConfig = {name: FormControlNames.NAME_FORM_CONTROL, type: InputTypes.TEXT, label: 'Naziv'};
  amountInputConfig: FieldConfig = {name: FormControlNames.AMOUNT_FORM_CONTROL, type: InputTypes.NUMBER, label: 'Količina'};
  codeInputConfig: FieldConfig = {name: FormControlNames.CODE_FORM_CONTROL, type: InputTypes.TEXT, label: 'Šifra'};
  priceInputConfig: FieldConfig = {name: FormControlNames.PRICE_FORM_CONTROL, type: InputTypes.NUMBER, label: 'Cena'};
  idCurrentPriceSelectConfig: FieldConfig = {
    name: FormControlNames.ID_CURRENT_PRICE_FORM_CONTROL,
    type: InputTypes.SELECT,
    label: 'Naziv',
    options: this.data.keyPrices
  };
  idCarModelGroupSelect: FieldConfig = {
    name: FormControlNames.ID_CAR_MODEL_FORM_CONTROL,
    type: InputTypes.SELECT,
    label: 'Brend/Model automobila'
  };
  idKeySubCategoriesGroupSelect: FieldConfig = {
    name: FormControlNames.ID_KEY_SUB_CATEGORY_FORM_CONTROL,
    type: InputTypes.TEXT,
    label: 'Kategorija ključa'
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: Key, private keyService: KeyService, private sb: MatSnackBar,
              private keyPriceService: KeyPriceService, private readonly changeDetectorRef: ChangeDetectorRef,
              public keyCategoryService: KeyCategoryService, private carBrandService: CarBrandService) {
    super(keyService);
  }

  initSnackBar(): void {
    this.setSnackBar = this.sb;
  }

  ngOnInit(): void {
    console.log(this.data);
    this.initSnackBar();
    this.getKeyCategories();
    this.getCarBrands();
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
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


  updateKey(): void {
    const key: Key = this.keyForm.getRawValue();
    key.id = this.data.id;
    super.update(key);
  }

  deleteKeyPrice(id: number): void {
    super.genericSubscribe(this.keyService.delete(id));
  }
}
