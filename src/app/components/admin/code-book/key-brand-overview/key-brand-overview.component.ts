import { Component, OnInit } from '@angular/core';
import { DefaultComponent } from '../../../../util/default-component';
import { KeyBrand } from '../../../../models/KeyBrand';
import { KeyBrandService } from '../../../../service/key-brand.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilderConfig } from '../../../../models/FormBuilderConfig';
import { FormControlNames, InputTypes } from '../../../../constant/const';
import { Validators } from '@angular/forms';
import { DialogUtil } from '../../../../util/dialog-util';
import { FormBuilderComponent } from '../../../form-components/form-builder/form-builder.component';
import { DialogOptions } from '../../../../util/dialog-options';

@Component({
  selector: 'app-key-brand-overview',
  templateUrl: './key-brand-overview.component.html',
  styleUrls: ['./key-brand-overview.component.sass'],
})
export class KeyBrandOverviewComponent extends DefaultComponent<KeyBrand> implements OnInit {

  constructor(private keyBrandService: KeyBrandService, private sb: MatSnackBar,
              private dialog: MatDialog) {
    super(keyBrandService);
    this.snackBar = sb;
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  openAddKeyBrandDialog(keyBrand?:KeyBrand): void {
    const configData: FormBuilderConfig = {
      formFields: [{
        name: FormControlNames.NAME_FORM_CONTROL,
        type: InputTypes.INPUT,
        label:'Naziv marke',
        validation: [Validators.required],
      }],
      formValues: keyBrand,
      headerText: 'Dodaj brend ključa',
      service: this.keyBrandService

    };
    DialogUtil.openDialog(FormBuilderComponent,
      DialogOptions.setDialogConfig({
        position: {top: '6%'},
        width: '30%',
        data: configData
      }), this.dialog).afterClosed().subscribe(() => {
      this.getAll();
    });
  }
}
