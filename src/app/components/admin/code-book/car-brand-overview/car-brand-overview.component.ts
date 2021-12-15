import { Component, OnInit } from "@angular/core";
import { DefaultComponent } from "../../../../util/default-component";
import { CarBrand } from "../../../../models/carBrand";
import { CarBrandService } from "../../../../service/car-brand.service";
import * as moment from "moment";
import { FormBuilderConfig } from "../../../../models/FormBuilderConfig";
import { FormControlNames, InputTypes } from "../../../../constant/const";
import { Validators } from "@angular/forms";
import { DialogUtil } from "../../../../util/dialog-util";
import { FormBuilderComponent } from "../../../form-components/form-builder/form-builder.component";
import { DialogOptions } from "../../../../util/dialog-options";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-car-brand-overview",
  templateUrl: "./car-brand-overview.component.html",
  styleUrls: ["./car-brand-overview.component.sass"]
})
export class CarBrandOverviewComponent extends DefaultComponent<CarBrand> implements OnInit {

  constructor(private carBrandService: CarBrandService, private dialog: MatDialog, private sb: MatSnackBar) {
    super(carBrandService);
    this.snackBar = sb;
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  openAddCarBrandDialog(data?: CarBrand): void {
    const configData: FormBuilderConfig = {
      formFields: [{
        name: FormControlNames.NAME_FORM_CONTROL,
        type: InputTypes.INPUT,
        validation: [Validators.required],
        label: "Naziv brenda automobila"
      }],
      formValues: data,
      headerText: "Dodaj brend automobila",
      service: this.carBrandService

    };
    DialogUtil.openDialog(FormBuilderComponent,
      DialogOptions.setDialogConfig({
        position: { top: "6%" },
        width: "30%",
        data: configData
      }), this.dialog).afterClosed().subscribe(() => {
      this.getAll();
    });
  }
}
