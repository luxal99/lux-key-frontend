import {Component, OnInit} from '@angular/core';
import {DefaultComponent} from '../../../../util/default-component';
import {Key} from '../../../../models/key';
import {KeyService} from '../../../../service/key.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {KeyCategoryService} from '../../../../service/key-category.service';
import {FieldConfig} from '../../../../models/FieldConfig';
import {FormControlNames, InputTypes, Message} from '../../../../constant/const';
import {KeyCategory} from '../../../../models/keyCategory';
import {CarBrand} from '../../../../models/carBrand';
import {CarBrandService} from '../../../../service/car-brand.service';
import {SnackBarUtil} from '../../../../util/snackbar-util';
import {KeyPriceService} from '../../../../service/key-price.service';

@Component({
  selector: 'app-add-key-dialog',
  templateUrl: './add-key-dialog.component.html',
  styleUrls: ['./add-key-dialog.component.sass']
})
export class AddKeyDialogComponent extends DefaultComponent<Key> implements OnInit {

  listOfKeyCategories: KeyCategory[] = [];
  listOfCarBrands: CarBrand[] = [];
  keyForm = new FormGroup({
    name: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    purchasePrice: new FormControl('', Validators.required),
    idCurrentPrice: new FormControl(''),
    idKeySubCategory: new FormControl('', Validators.required),
    idCarModel: new FormControl('', Validators.required)
  });

  nameInputConfig: FieldConfig = {name: FormControlNames.NAME_FORM_CONTROL, type: InputTypes.TEXT, label: 'Naziv'};
  amountInputConfig: FieldConfig = {name: FormControlNames.AMOUNT_FORM_CONTROL, type: InputTypes.NUMBER, label: 'Količina'};
  codeInputConfig: FieldConfig = {name: FormControlNames.CODE_FORM_CONTROL, type: InputTypes.TEXT, label: 'Šifra'};
  priceInputConfig: FieldConfig = {name: FormControlNames.PRICE_FORM_CONTROL, type: InputTypes.NUMBER, label: 'Cena'};
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

  constructor(private keyService: KeyService, private sb: MatSnackBar, private keyPriceService: KeyPriceService,
              public keyCategoryService: KeyCategoryService, private carBrandService: CarBrandService) {
    super(keyService);
    this.snackBar = sb;
  }


  ngOnInit(): void {
    this.getKeyCategories();
    this.getCarBrands();
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

  saveKey(): void {
    const entity = this.keyForm.getRawValue();
    delete entity.idCurrentPrice;

    this.keyService.save(entity).subscribe((savedKey) => {
      this.keyPriceService.save({
        price: this.keyForm.get(FormControlNames.PRICE_FORM_CONTROL).value,
        idKey: savedKey
      }).subscribe((savedKeyPrice) => {
        savedKey.idCurrentPrice = savedKeyPrice;
        super.update(savedKey);
      });
    });
  }

}
