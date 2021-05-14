import {Component, OnInit} from '@angular/core';
import {ServiceService} from '../../../service/service.service';
import {DefaultComponent} from '../../../util/default-component';
import {Service} from '../../../models/service';
import {DialogUtil} from '../../../util/dialog-util';
import {AddServiceDialogComponent} from './add-service-dialog/add-service-dialog.component';
import {DialogOptions} from '../../../util/dialog-options';
import {MatDialog} from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.sass']
})
export class ServicesComponent extends DefaultComponent<Service> implements OnInit {

  listOfCurrentWeekServices: Service[] = [];
  startDate: string = moment().startOf('isoWeek').format('YYYY-MM-DD');
  endDate: string = moment().endOf('isoWeek').format('YYYY-MM-DD');

  constructor(private serviceService: ServiceService, private dialog: MatDialog) {
    super(serviceService);
  }


  ngOnInit(): void {
    this.getServicesInCurrentWeek();
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
}
