import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../../service/service.service';
import { DefaultComponent } from '../../../util/default-component';
import { Service } from '../../../models/service';
import { DialogUtil } from '../../../util/dialog-util';
import { AddServiceDialogComponent } from './add-service-dialog/add-service-dialog.component';
import { DialogOptions } from '../../../util/dialog-options';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  DATE_VALUE_FORMAT,
  FormControlNames,
  InputTypes,
} from '../../../constant/const';
import { KeySubCategory } from '../../../models/keySubCategory';
import { FormBuilderConfig } from '../../../models/FormBuilderConfig';
import { FormBuilderComponent } from '../../form-components/form-builder/form-builder.component';
import { WorkServiceService } from '../../../service/work-service.service';
import { MatSpinner } from '@angular/material/progress-spinner';
import { Query } from '../../../models/dto/query/Query';
import { queryType, sortType } from '../../../types/types';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.sass'],
})
export class ServicesComponent
  extends DefaultComponent<Service>
  implements OnInit
{
  @ViewChild('periodSpinner') periodSpinner!: MatSpinner;

  startOfMonth = moment().clone().startOf('month').format(DATE_VALUE_FORMAT);
  endOfMonth = moment().clone().endOf('month').format(DATE_VALUE_FORMAT);

  startDate: string = moment().startOf('isoWeek').format(DATE_VALUE_FORMAT);
  endDate: string = moment().endOf('isoWeek').format(DATE_VALUE_FORMAT);

  listOfCurrentWeekServices: Service[] = [];
  listOfDateRangeServices: Service[] = [];

  queryBuilder: Query = {
    dateQuery: { startDate: this.startDate, endDate: this.endDate },
    pagination: { rows: 10, page: 0 },
    sort: { sortType: 'DESC', columnName: 'service.createdDate' },
  };

  customPeriodQueryBuilder: Query = {
    dateQuery: { startDate: this.startOfMonth, endDate: this.endOfMonth },
    pagination: { rows: 10, page: 0 },
    sort: { sortType: 'DESC', columnName: 'service.createdDate' },
  };

  dateRangeForm = new FormGroup({
    startDate: new FormControl(this.startOfMonth, Validators.required),
    endDate: new FormControl(this.endOfMonth, Validators.required),
  });

  currentWeekDataCount = 0;
  currentWeekNumberOfPages = 0;
  currentWeekTotal = 0;

  customPeriodTotal = 0;
  customPeriodDataCount = 0;

  constructor(
    private serviceService: ServiceService,
    private dialog: MatDialog,
    private workService: WorkServiceService
  ) {
    super(serviceService);
  }

  ngOnInit(): void {
    this.getServicesInCurrentWeek();
    setTimeout(() => {
      this.getServicesFromRange();
    }, 100);
  }

  getServicesInCurrentWeek(page?: any): void {
    if (page) {
      this.getSpinnerService.show(this.spinner);
      this.queryBuilder.pagination.page = page.pageIndex;
      this.queryBuilder.pagination.rows = page.pageSize;
    }
    this.serviceService
      .findServiceByDate(encodeURI(JSON.stringify(this.queryBuilder)))
      .subscribe((resp) => {
        this.listOfCurrentWeekServices = resp.body;
        this.currentWeekDataCount = Number.parseInt(
          resp.headers.get('data_count')
        );
        this.currentWeekNumberOfPages = Number.parseInt(
          resp.headers.get('number_of_pages')
        );
        this.currentWeekTotal = Number.parseInt(resp.headers.get('sum'));
        this.getSpinnerService.hide(this.spinner);
      });
  }

  openAddServiceDialog(): void {
    DialogUtil.openDialog(
      AddServiceDialogComponent,
      DialogOptions.setDialogConfig({
        width: '50%',
        maxHeight: '80vh',
      }),
      this.dialog
    )
      .afterClosed()
      .subscribe(() => {
        this.getServicesInCurrentWeek();
      });
  }

  getServicesFromRange(page?: any): void {
    if (page) {
      this.getSpinnerService.show(this.spinner);
      this.customPeriodQueryBuilder.pagination.page = page.pageIndex;
      this.customPeriodQueryBuilder.pagination.rows = page.pageSize;
    }

    this.customPeriodQueryBuilder.dateQuery.startDate = moment(
      this.dateRangeForm.get(FormControlNames.START_DATE_FORM_CONTROL).value
    ).format(DATE_VALUE_FORMAT);
    this.customPeriodQueryBuilder.dateQuery.endDate = moment(
      this.dateRangeForm.get(FormControlNames.END_DATE_FORM_CONTROL).value
    ).format(DATE_VALUE_FORMAT);
    this.serviceService
      .findServiceByDate(
        encodeURI(JSON.stringify(this.customPeriodQueryBuilder))
      )
      .subscribe((resp) => {
        this.listOfDateRangeServices = resp.body;
        this.customPeriodDataCount = Number.parseInt(
          resp.headers.get('data_count')
        );

        this.customPeriodTotal = Number.parseInt(resp.headers.get('sum'));
        this.getSpinnerService.hide(this.periodSpinner);
      });
  }

  async openAddKeySubCategoryDialog(
    keySubCategory?: KeySubCategory
  ): Promise<void> {
    const configData: FormBuilderConfig = {
      formFields: [
        {
          name: FormControlNames.DATE_FORM_CONTROL,
          type: InputTypes.DATE,
          label: 'Datum',
          value: moment().format(DATE_VALUE_FORMAT),
          validation: [Validators.required],
        },
        {
          name: FormControlNames.NOTES,
          type: InputTypes.INPUT,
          label: 'Naslov',
        },
        {
          name: FormControlNames.ID_WORK_SERVICE,
          type: InputTypes.SELECT,
          label: 'Usluga',
          options: await this.workService.getAll().toPromise(),
          validation: [Validators.required],
        },
        {
          name: FormControlNames.GROSS_FORM_CONTROL,
          type: InputTypes.INPUT,
          label: 'Ukupno',
        },
      ],
      formValues: keySubCategory,
      headerText: 'Dodaj servis',
      service: this.serviceService,
    };
    DialogUtil.openDialog(
      FormBuilderComponent,
      DialogOptions.setDialogConfig({
        position: { top: '6%' },
        width: '30%',
        data: configData,
      }),
      this.dialog
    )
      .afterClosed()
      .subscribe(() => {
        this.getServicesInCurrentWeek();
      });
  }

  sortByPrice(query: Query, sortType: sortType, queryType: queryType): void {
    query.sort.sortType = sortType;
    query.sort.columnName = 'service.gross';
    console.log(query);
    switch (queryType) {
      case 'CUSTOM':
        this.getServicesFromRange(0);
        break;
      case 'WEEK':
        this.getServicesInCurrentWeek(0);
        break;
    }
  }

  sortByDate(query: Query, sortType: sortType, queryType: queryType): void {
    query.sort.sortType = sortType;
    query.sort.columnName = 'service.createdDate';
    switch (queryType) {
      case 'CUSTOM':
        this.getServicesFromRange(0);
        break;
      case 'WEEK':
        this.getServicesInCurrentWeek(0);
        break;
    }
  }
}
