import { Component, OnInit, ViewChild } from "@angular/core";
import { WorkServiceService } from "../../../../service/work-service.service";
import { WorkService } from "../../../../models/workService";
import { FormBuilderConfig } from "../../../../models/FormBuilderConfig";
import { FormControlNames, InputTypes, Message } from "../../../../constant/const";
import { Validators } from "@angular/forms";
import { DialogUtil } from "../../../../util/dialog-util";
import { FormBuilderComponent } from "../../../form-components/form-builder/form-builder.component";
import { DialogOptions } from "../../../../util/dialog-options";
import { MatDialog } from "@angular/material/dialog";
import { MatSpinner } from "@angular/material/progress-spinner";
import { SpinnerService } from "../../../../service/spinner-service.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarUtil } from "../../../../util/snackbar-util";

@Component({
  selector: "app-work-service-overview",
  templateUrl: "./work-service-overview.component.html",
  styleUrls: ["./work-service-overview.component.sass"],
})
export class WorkServiceOverviewComponent implements OnInit {

  @ViewChild("spinner") spinner: MatSpinner;
  listOfWorkServices: WorkService[] = [];

  constructor(private workService: WorkServiceService, private dialog: MatDialog,
              private spinnerService: SpinnerService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  openAddWorkServiceDialog(workService?: WorkService): void {
    const configData: FormBuilderConfig = {
      formFields: [
        {
          name: FormControlNames.NAME_FORM_CONTROL,
          type: InputTypes.INPUT,
          label: "Naziv usluge",
          validation: [Validators.required],
        },
        {
          name: FormControlNames.PRICE_FORM_CONTROL,
          type: InputTypes.INPUT,
          label: "Cena usluge",
          validation: [Validators.required],
        },

      ],
      formValues: workService,
      headerText: "Dodaj uslugu",
      service: this.workService,

    };
    DialogUtil.openDialog(FormBuilderComponent,
      DialogOptions.setDialogConfig({
        position: { top: "6%" },
        width: "30%",
        data: configData,
      }), this.dialog).afterClosed().subscribe((data) => {
      if (data) {
        this.spinnerService.show(this.spinner);
        this.getAll();
      }
    });
  }

  getAll(): void {
    this.workService.getAll().subscribe((data) => {
      this.listOfWorkServices = data;
      this.spinnerService.hide(this.spinner);
    });
  }

  delete(id: number) {
    this.spinnerService.show(this.spinner);
    this.workService.delete(id).subscribe(() => {
      this.spinnerService.hide(this.spinner);
    }, () => {
      SnackBarUtil.openSnackBar(this.snackBar, Message.ERR);
      this.spinnerService.hide(this.spinner);
    });

  }
}
