import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Service} from '../../../../models/service';
import {DialogUtil} from '../../../../util/dialog-util';
import {ServiceOverviewDialogComponent} from '../service-overview-dialog/service-overview-dialog.component';
import {DialogOptions} from '../../../../util/dialog-options';
import {MatDialog} from '@angular/material/dialog';
import {AddServiceDialogComponent} from '../add-service-dialog/add-service-dialog.component';
import {ServiceService} from '../../../../service/service.service';
import {SnackBarUtil} from '../../../../util/snackbar-util';
import {Message} from '../../../../constant/const';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SpinnerService} from '../../../../service/spinner-service.service';
import {MatSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-service-table-binding',
  templateUrl: './service-table-binding.component.html',
  styleUrls: ['./service-table-binding.component.sass']
})
export class ServiceTableBindingComponent implements OnInit {

  @ViewChild('spinner') spinner: MatSpinner;
  @Input() list: Service[] = [];

  @Output() cb = new EventEmitter();
  displayedColumns = ['date', 'client', 'gross', 'option'];

  constructor(private snackBar: MatSnackBar, private spinnerService: SpinnerService,
              private dialog: MatDialog, private serviceService: ServiceService) {
  }

  ngOnInit(): void {
  }

  openServiceOverviewDialog(element: Service): void {
    DialogUtil.openDialog(ServiceOverviewDialogComponent, DialogOptions.setDialogConfig({
      position: {right: '0'},
      width: '40%',
      height: '100vh',
      data: element
    }), this.dialog);

  }

  openEditServiceDialog(element: Service): void {
    DialogUtil.openDialog(AddServiceDialogComponent, DialogOptions.setDialogConfig({
      position: {right: '0'},
      width: '40%',
      height: '100vh',
      data: element
    }), this.dialog);
  }

  delete(id: number): void {
    this.spinnerService.show(this.spinner);
    this.serviceService.delete(id).subscribe(() => {
      SnackBarUtil.openSnackBar(this.snackBar, Message.SUCCESS);
      this.spinnerService.hide(this.spinner);
      this.cb.emit(true);
    }, () => {
      this.spinnerService.hide(this.spinner);
      SnackBarUtil.openSnackBar(this.snackBar, Message.ERR);
    });
  }
}
