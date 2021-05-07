import {Component, OnInit} from '@angular/core';
import {CarModelService} from 'src/app/service/car-model.service';
import {DefaultComponent} from '../../../../util/default-component';
import {CarModel} from '../../../../models/carModel';
import {CarBrand} from '../../../../models/carBrand';
import {FormBuilderConfig} from '../../../../models/FormBuilderConfig';
import {FormControlNames, InputTypes} from '../../../../constant/const';
import {Validators} from '@angular/forms';
import {DialogUtil} from '../../../../util/dialog-util';
import {FormBuilderComponent} from '../../../form-components/form-builder/form-builder.component';
import {DialogOptions} from '../../../../util/dialog-options';
import {MatDialog} from '@angular/material/dialog';
import {CarBrandService} from '../../../../service/car-brand.service';

@Component({
  selector: 'app-car-model-overview',
  templateUrl: './car-model-overview.component.html',
  styleUrls: ['./car-model-overview.component.sass']
})
export class CarModelOverviewComponent extends DefaultComponent<CarModel> implements OnInit {

  constructor(private carModelService: CarModelService, private dialog: MatDialog, private carBrandService: CarBrandService) {
    super(carModelService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  async openAddCarModelDialog(data?: CarModel): Promise<void> {

    const options = await this.carBrandService.getAll().toPromise();
    const configData: FormBuilderConfig = {
      formFields: [
        {
          name: FormControlNames.NAME_FORM_CONTROL,
          type: InputTypes.INPUT,
          validation: [Validators.required],
        },
        {
          name: FormControlNames.ID_CAR_BRAND_FORM_CONTROL,
          type: InputTypes.SELECT,
          validation: [Validators.required],
          options,
        }
      ],
      formValues: data,
      headerText: 'Dodaj model automobila',
      service: this.carModelService

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
