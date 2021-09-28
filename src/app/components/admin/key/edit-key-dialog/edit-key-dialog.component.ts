import { AfterViewChecked, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { DefaultComponent } from '../../../../util/default-component';
import { Key } from '../../../../models/key';
import { KeyCategory } from '../../../../models/keyCategory';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldConfig } from '../../../../models/FieldConfig';
import { FormControlNames, InputTypes } from '../../../../constant/const';
import { KeyService } from '../../../../service/key.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KeyPriceService } from '../../../../service/key-price.service';
import { KeyCategoryService } from '../../../../service/key-category.service';
import { CarBrandService } from '../../../../service/car-brand.service';
import { KeyPrice } from '../../../../models/keyPrice';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-key-dialog',
  templateUrl: './edit-key-dialog.component.html',
  styleUrls: ['./edit-key-dialog.component.sass'],
})
export class EditKeyDialogComponent extends DefaultComponent<Key> implements OnInit, AfterViewChecked {

  listOfKeyCategories: KeyCategory[] = [];

  keyForm = new FormGroup({
    name: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    idCurrentPrice: new FormControl(''),
    idKeySubCategory: new FormControl('', Validators.required),
    carBrands: new FormControl(''),
  });

  keyPriceForm = new FormGroup({
    price: new FormControl('', Validators.required),
  });
  nameInputConfig: FieldConfig = { name: FormControlNames.NAME_FORM_CONTROL, type: InputTypes.TEXT, label: 'Naziv' };
  amountInputConfig: FieldConfig = {
    name: FormControlNames.AMOUNT_FORM_CONTROL,
    type: InputTypes.NUMBER,
    label: 'Količina',
  };
  codeInputConfig: FieldConfig = { name: FormControlNames.CODE_FORM_CONTROL, type: InputTypes.TEXT, label: 'Šifra' };
  priceInputConfig: FieldConfig = { name: FormControlNames.PRICE_FORM_CONTROL, type: InputTypes.NUMBER, label: 'Cena' };
  idCurrentPriceSelectConfig: FieldConfig = {
    name: FormControlNames.ID_CURRENT_PRICE_FORM_CONTROL,
    type: InputTypes.SELECT,
    label: 'Trenutna cena',
    options: this.data.keyPrices,
  };
  carBrandSelectConfig: FieldConfig = {
    name: FormControlNames.CAR_BRANDS_FORM_CONTROL,
    type: InputTypes.SELECT, label: 'Brend automobila',
    multipleOptions: true,
    implSearch: true,
  };
  idKeySubCategoriesGroupSelect: FieldConfig = {
    name: FormControlNames.ID_KEY_SUB_CATEGORY_FORM_CONTROL,
    type: InputTypes.TEXT,
    label: 'Kategorija ključa',
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: Key, private keyService: KeyService, private sb: MatSnackBar,
              private keyPriceService: KeyPriceService, private readonly changeDetectorRef: ChangeDetectorRef,
              public keyCategoryService: KeyCategoryService, private carBrandService: CarBrandService) {
    super(keyService);
    this.snackBar = sb;
  }

  ngOnInit(): void {
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
      this.carBrandSelectConfig.options = resp;
    });
  }


  updateKey(): void {
    const key: Key = this.keyForm.getRawValue();
    key.id = this.data.id;
    super.update(key);
  }

  deleteKeyPrice(keyPrice: KeyPrice): void {
    super.genericSubscribe(this.keyPriceService.delete(keyPrice.id), (): any => {
      this.data.keyPrices.splice(this.data.keyPrices.indexOf(keyPrice), 1);
    });
  }

  async addKeyPrice(): Promise<void> {
    this.data.keyPrices.push(await super.genericPromiseSubscribe(this.keyPriceService.save(
      { idKey: this.data, price: this.keyPriceForm.get(FormControlNames.PRICE_FORM_CONTROL).value },
    )));
  }
}
