import { Component, OnInit } from "@angular/core";
import { KeyCategoryService } from "../../../../service/key-category.service";
import { KeySubCategoryService } from "../../../../service/key-sub-category.service";
import { MatDialog } from "@angular/material/dialog";
import { DefaultComponent } from "../../../../util/default-component";
import { KeySubCategory } from "../../../../models/keySubCategory";
import { FormBuilderConfig } from "../../../../models/FormBuilderConfig";
import { FormControlNames, InputTypes } from "../../../../constant/const";
import { Validators } from "@angular/forms";
import { DialogUtil } from "../../../../util/dialog-util";
import { FormBuilderComponent } from "../../../form-components/form-builder/form-builder.component";
import { DialogOptions } from "../../../../util/dialog-options";

@Component({
  selector: "app-key-sub-category-overview",
  templateUrl: "./key-sub-category-overview.component.html",
  styleUrls: ["./key-sub-category-overview.component.sass"],
})
export class KeySubCategoryOverviewComponent extends DefaultComponent<KeySubCategory> implements OnInit {

  constructor(private keyCategoryService: KeyCategoryService, private keySubCategoryServ9ce: KeySubCategoryService,
              private dialog: MatDialog) {
    super(keySubCategoryServ9ce);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  async openAddKeySubCategoryDialog(keySubCategory?: KeySubCategory): Promise<void> {
    const options = await this.keyCategoryService.getAll().toPromise();
    const configData: FormBuilderConfig = {
      formFields: [
        {
          name: FormControlNames.NAME_FORM_CONTROL,
          type: InputTypes.INPUT,
          label: "Naziv potkategorije",
          validation: [Validators.required],
        },
        {
          name: FormControlNames.ID_KEY_CATEGORY_FORM_CONTROL,
          type: InputTypes.SELECT,
          label: "Kategorija kljuca",
          validation: [Validators.required],
          options,
        },
      ],
      formValues: keySubCategory,
      headerText: "Dodaj model automobila",
      service: this.keySubCategoryServ9ce,

    };
    DialogUtil.openDialog(FormBuilderComponent,
      DialogOptions.setDialogConfig({
        position: { top: "6%" },
        width: "30%",
        data: configData,
      }), this.dialog).afterClosed().subscribe(() => {
      this.getAll();
    });
  }

}
