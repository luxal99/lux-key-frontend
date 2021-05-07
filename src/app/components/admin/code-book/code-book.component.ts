import {Component, OnInit} from '@angular/core';
import {CarBrandService} from '../../../service/car-brand.service';
import {CarModelService} from '../../../service/car-model.service';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilderConfig} from '../../../models/FormBuilderConfig';
import {FormControlNames, InputTypes} from '../../../constant/const';
import {Validators} from '@angular/forms';
import {DialogOptions} from '../../../util/dialog-options';
import {FormBuilderComponent} from '../../form-components/form-builder/form-builder.component';
import {DialogUtil} from '../../../util/dialog-util';
import {CarBrand} from '../../../models/carBrand';
import {LazyLoadComponentsUtil} from '../../../util/lazy-loading-components';
import {CarBrandOverviewComponent} from './car-brand-overview/car-brand-overview.component';

@Component({
  selector: 'app-code-book',
  templateUrl: './code-book.component.html',
  styleUrls: ['./code-book.component.sass']
})
export class CodeBookComponent implements OnInit {

  constructor(private carBrandService: CarBrandService, private carModelService: CarModelService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }


  openAddCarModelDialog(): void {

  }
}
