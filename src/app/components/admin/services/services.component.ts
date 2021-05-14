import {Component, OnInit} from '@angular/core';
import {ServiceService} from '../../../service/service.service';
import {DefaultComponent} from '../../../util/default-component';
import {Service} from '../../../models/service';
import {DialogUtil} from '../../../util/dialog-util';
import {AddServiceDialogComponent} from './add-service-dialog/add-service-dialog.component';
import {DialogOptions} from '../../../util/dialog-options';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.sass']
})
export class ServicesComponent extends DefaultComponent<Service> implements OnInit {

  constructor(private serviceService: ServiceService, private dialog: MatDialog) {
    super(serviceService);
  }


  ngOnInit(): void {
    super.ngOnInit();
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
