import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../service/service.service';
import { DefaultComponent } from '../../../util/default-component';
import { Service } from '../../../models/service';
import { DialogUtil } from '../../../util/dialog-util';
import { AddServiceDialogComponent } from './add-service-dialog/add-service-dialog.component';
import { DialogOptions } from '../../../util/dialog-options';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormControlNames, InputTypes } from '../../../constant/const';
import { KeySubCategory } from '../../../models/keySubCategory';
import { FormBuilderConfig } from '../../../models/FormBuilderConfig';
import { FormBuilderComponent } from '../../form-components/form-builder/form-builder.component';
import { WorkServiceService } from '../../../service/work-service.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.sass'],
})
export class ServicesComponent extends DefaultComponent<Service> implements OnInit {

  startOfMonth = moment().clone().startOf('month').format('YYYY-MM-DD');
  endOfMonth = moment().clone().endOf('month').format('YYYY-MM-DD');

  startDate: string = moment().startOf('isoWeek').format('YYYY-MM-DD');
  endDate: string = moment().endOf('isoWeek').format('YYYY-MM-DD');

  listOfCurrentWeekServices: Service[] = [];
  listOfDateRangeServices: Service[] = [];

  dateRangeForm = new FormGroup({
    startDate: new FormControl(this.startOfMonth, Validators.required),
    endDate: new FormControl(this.endOfMonth, Validators.required),
  });

  constructor(private serviceService: ServiceService, private dialog: MatDialog,
              private workService: WorkServiceService) {
    super(serviceService);
  }


  ngOnInit(): void {
    this.getServicesInCurrentWeek();
    setTimeout(() => {
      this.getServicesFromRange();
    }, 100);
  }

  getServicesInCurrentWeek(): void {
    this.serviceService.findServiceByDate(this.startDate, this.endDate).subscribe((resp) => {
      this.listOfCurrentWeekServices = resp;
      this.getSpinnerService.hide(this.spinner);
    });
  }

  openAddServiceDialog(): void {
    DialogUtil.openDialog(AddServiceDialogComponent, DialogOptions.setDialogConfig({
      width: '50%',
      maxHeight: '80vh',
    }), this.dialog).afterClosed().subscribe(() => {
      this.getServicesInCurrentWeek();
    });
  }

  getServicesFromRange(): void {
    this.getSpinnerService.show(this.spinner);
    const startDate = moment(this.dateRangeForm.get(FormControlNames.START_DATE_FORM_CONTROL).value).format('YYYY-MM-DD');
    const endDate = moment(this.dateRangeForm.get(FormControlNames.END_DATE_FORM_CONTROL).value).format('YYYY-MM-DD ');
    this.serviceService.findServiceByDate(startDate, endDate).subscribe((resp) => {
      this.listOfDateRangeServices = resp;
      this.getSpinnerService.hide(this.spinner);
    });
  }

  async openAddKeySubCategoryDialog(keySubCategory?: KeySubCategory): Promise<void> {
    const configData: FormBuilderConfig = {
      formFields: [
        {
          name: FormControlNames.DATE_FORM_CONTROL,
          type: InputTypes.DATE,
          label: 'Datum',
          value: moment().format("YYYY-MM-DD"),
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
          label: 'Ukupno'
        },
      ],
      formValues: keySubCategory,
      headerText: 'Dodaj servis',
      service: this.serviceService,

    };
    DialogUtil.openDialog(FormBuilderComponent,
      DialogOptions.setDialogConfig({
        position: { top: '6%' },
        width: '30%',
        data: configData,
      }), this.dialog).afterClosed().subscribe(() => {
      this.getServicesInCurrentWeek();
    });
  }
}
