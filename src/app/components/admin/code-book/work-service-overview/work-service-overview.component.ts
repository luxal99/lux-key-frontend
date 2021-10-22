import { Component, OnInit } from '@angular/core';
import { WorkService } from '../../../../models/workService';
import { WorkServiceService } from '../../../../service/work-service.service';
import { DefaultComponent } from '../../../../util/default-component';
import { FormBuilderConfig } from '../../../../models/FormBuilderConfig';
import { FormControlNames, InputTypes } from '../../../../constant/const';
import { Validators } from '@angular/forms';
import { DialogUtil } from '../../../../util/dialog-util';
import { FormBuilderComponent } from '../../../form-components/form-builder/form-builder.component';
import { DialogOptions } from '../../../../util/dialog-options';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-work-service-overview',
  templateUrl: './work-service-overview.component.html',
  styleUrls: ['./work-service-overview.component.sass'],
})
export class WorkServiceOverviewComponent extends DefaultComponent<WorkService> implements OnInit {


  constructor(private workServiceService: WorkServiceService,
              private sb: MatSnackBar,
              private dialog: MatDialog) {
    super(workServiceService);
    this.snackBar = sb;
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  openAddWorkServiceDialog(workService?: WorkService): void {
    const configData: FormBuilderConfig = {
      formFields: [
        {
          name: FormControlNames.NAME_FORM_CONTROL,
          type: InputTypes.INPUT,
          label: 'Naziv usluge',
          validation: [Validators.required],
        },
        {
          name: FormControlNames.PRICE_FORM_CONTROL,
          type: InputTypes.INPUT,
          label: 'Cena',
          validation: [Validators.required],
        }],
      formValues: workService,
      headerText: 'Dodaj uslugu',
      service: this.workServiceService,

    };
    DialogUtil.openDialog(FormBuilderComponent,
      DialogOptions.setDialogConfig({
        position: { top: '6%' },
        width: '30%',
        data: configData,
      }), this.dialog).afterClosed().subscribe(() => {
      this.getAll();
    });
  }

}
