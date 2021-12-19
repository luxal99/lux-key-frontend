import { Component, OnInit } from "@angular/core";
import { DefaultComponent } from "../../../util/default-component";
import { Client } from "../../../../client";
import { ClientService } from "../../../service/client.service";
import { FormBuilderConfig } from "../../../models/FormBuilderConfig";
import { FormControlNames, InputTypes } from "../../../constant/const";
import { Validators } from "@angular/forms";
import { DialogUtil } from "../../../util/dialog-util";
import { FormBuilderComponent } from "../../form-components/form-builder/form-builder.component";
import { DialogOptions } from "../../../util/dialog-options";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.sass"]
})
export class ClientComponent extends DefaultComponent<Client> implements OnInit {

  constructor(private clientService: ClientService, private dialog: MatDialog, private sb: MatSnackBar) {
    super(clientService);
    super.snackBar = this.sb;
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  openAddClientDialog(client?: Client): void {
    const configData: FormBuilderConfig = {
      formFields: [
        {
          name: FormControlNames.FIRST_NAME_FORM_CONTROL,
          type: InputTypes.INPUT,
          validation: [Validators.required],
          label: "Ime"
        },
        {
          name: FormControlNames.LAST_NAME_FORM_CONTROL,
          type: InputTypes.INPUT,
          validation: [Validators.required],
          label: "Prezime"
        },
        {
          name: FormControlNames.TELEPHONE_FORM_CONTROL,
          type: InputTypes.INPUT,
          validation: [Validators.required],
          label: "Kontakt telefon"
        }
      ],
      formValues: client,
      headerText: "Dodaj klijenta",
      service: this.clientService

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
