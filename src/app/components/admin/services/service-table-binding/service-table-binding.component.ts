import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Service} from '../../../../models/service';
import {DialogUtil} from '../../../../util/dialog-util';
import {ServiceOverviewDialogComponent} from '../service-overview-dialog/service-overview-dialog.component';
import {DialogOptions} from '../../../../util/dialog-options';
import {MatDialog} from '@angular/material/dialog';
import {AddServiceDialogComponent} from '../add-service-dialog/add-service-dialog.component';

@Component({
  selector: 'app-service-table-binding',
  templateUrl: './service-table-binding.component.html',
  styleUrls: ['./service-table-binding.component.sass']
})
export class ServiceTableBindingComponent implements OnInit {

  @Input() list: Service[] = [];
  @Output() deleteMethod = new EventEmitter();
  displayedColumns = ['date', 'client', 'gross', 'option'];

  constructor(private dialog: MatDialog) {
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
}
