import { Component, OnInit } from "@angular/core";
import { KeyCategory } from "../../../../models/keyCategory";
import { DefaultComponent } from "../../../../util/default-component";
import { KeyCategoryService } from "../../../../service/key-category.service";
import { FormBuilderConfig } from "../../../../models/FormBuilderConfig";
import { FormControlNames, InputTypes } from "../../../../constant/const";
import { Validators } from "@angular/forms";
import { DialogUtil } from "../../../../util/dialog-util";
import { FormBuilderComponent } from "../../../form-components/form-builder/form-builder.component";
import { DialogOptions } from "../../../../util/dialog-options";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-key-category-overview",
  templateUrl: "./key-category-overview.component.html",
  styleUrls: ["./key-category-overview.component.sass"]
})
export class KeyCategoryOverviewComponent extends DefaultComponent<KeyCategory> implements OnInit {

  constructor(private keyCategoryService: KeyCategoryService, private dialog: MatDialog) {
    super(keyCategoryService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  openAddKeyCategoryDialog(keyCategory?: KeyCategory): void {
    const configData: FormBuilderConfig = {
      formFields: [{
        name: FormControlNames.NAME_FORM_CONTROL,
        type: InputTypes.INPUT,
        label: "Naziv kategorije",
        validation: [Validators.required],
      }],
      formValues: keyCategory,
      headerText: "Dodaj kategoriju ključa",
      service: this.keyCategoryService

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
