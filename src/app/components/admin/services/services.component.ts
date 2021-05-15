import {Component, OnInit} from '@angular/core';
import {ServiceService} from '../../../service/service.service';
import {DefaultComponent} from '../../../util/default-component';
import {Service} from '../../../models/service';
import {DialogUtil} from '../../../util/dialog-util';
import {AddServiceDialogComponent} from './add-service-dialog/add-service-dialog.component';
import {DialogOptions} from '../../../util/dialog-options';
import {MatDialog} from '@angular/material/dialog';
import * as moment from 'moment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormControlNames} from '../../../constant/const';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.sass']
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
    endDate: new FormControl(this.endOfMonth, Validators.required)
  });

  constructor(private serviceService: ServiceService, private dialog: MatDialog) {
    super(serviceService);
  }


  ngOnInit(): void {
    this.getServicesInCurrentWeek();
    this.getServicesFromRange();
  }

  getServicesInCurrentWeek(): void {
    this.serviceService.findServiceByDate(this.startDate, this.endDate).subscribe((resp) => {
      this.listOfCurrentWeekServices = resp;
      this.getSpinnerService.hide(this.spinner);
    });
  }

  openAddServiceDialog(): void {
    DialogUtil.openDialog(AddServiceDialogComponent, DialogOptions.setDialogConfig({
      position: {right: '0'},
      width: '40%',
      height: '100vh'
    }), this.dialog).afterClosed().subscribe(() => {
      this.getAll();
    });
  }

  getServicesFromRange(): void {
    const startDate = moment(this.dateRangeForm.get(FormControlNames.START_DATE_FORM_CONTROL).value).format('YYYY-MM-DD');
    const endDate = moment(this.dateRangeForm.get(FormControlNames.END_DATE_FORM_CONTROL).value).format('YYYY-MM-DD ');
    this.serviceService.findServiceByDate(startDate, endDate).subscribe((resp) => {
      this.listOfDateRangeServices = resp;
      this.getSpinnerService.hide(this.spinner);
    });
  }
}
