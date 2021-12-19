import { AfterViewChecked, ChangeDetectorRef, Component, Inject, OnChanges, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FieldConfig } from "src/app/models/FieldConfig";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthGuard } from "../../../guards/auth.guard";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SnackBarUtil } from "src/app/util/snackbar-util";
import { FormControlNames, Message } from "src/app/constant/const";
import { SpinnerService } from "src/app/service/spinner-service.service";
import { MatSpinner } from "@angular/material/progress-spinner";
import { FormBuilderConfig } from "../../../models/FormBuilderConfig";

@Component({
  selector: "app-form-builder",
  templateUrl: "./form-builder.component.html",
  styleUrls: ["./form-builder.component.sass"],
})
export class FormBuilderComponent implements OnChanges, OnInit, AfterViewChecked {

  @ViewChild("spinner") spinner!: MatSpinner;
  form!: FormGroup;

  get controls(): any {
    return this.configData.formFields.filter(({ type }) => type !== "button");
  }

  get changes(): any {
    return this.form.valueChanges;
  }

  get valid(): any {
    return this.form.valid;
  }

  get value(): any {
    return this.form.value;
  }

  constructor(@Inject(MAT_DIALOG_DATA) public configData: FormBuilderConfig, private fb: FormBuilder,
              private readonly changeDetectorRef: ChangeDetectorRef,
              private dialogRef: MatDialogRef<FormBuilderComponent>,
              private snackBar: MatSnackBar, private authGuard: AuthGuard, private spinnerService: SpinnerService) {
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
    this.form = this.createGroup();
    setTimeout(() => {
      this.setValue();
    }, 100);
  }

  save(): any {
    this.spinnerService.show(this.spinner);
    if (!this.configData.formValues) {
      this.configData.service.save(this.form.getRawValue()).subscribe((data) => {
        SnackBarUtil.openSnackBar(this.snackBar, Message.SUCCESS);
        this.dialogRef.close(data);
        this.spinnerService.hide(this.spinner);
      }, () => {
        this.spinnerService.hide(this.spinner);
        SnackBarUtil.openSnackBar(this.snackBar, Message.ERR);
      });
    } else {
      const obj = this.form.getRawValue();
      obj.id = this.configData.formValues.id;
      this.configData.service.update(obj).subscribe((data) => {
        this.spinnerService.hide(this.spinner);
        this.dialogRef.close(data);
        SnackBarUtil.openSnackBar(this.snackBar, Message.SUCCESS);
      }, () => {
        this.spinnerService.hide(this.spinner);
        SnackBarUtil.openSnackBar(this.snackBar, Message.ERR);
      });
    }
  }

  ngOnChanges(): void {
    if (this.form) {
      const controls = Object.keys(this.form.controls);
      const configControls = this.controls.map((item: any) => item.name);

      controls
        .filter((control) => !configControls.includes(control))
        .forEach((control) => this.form.removeControl(control));

      configControls
        .filter((control: any) => !controls.includes(control))
        .forEach((name: any) => {
          const config: any = this.configData.formFields.find((control) => control.name === name);
          this.form.addControl(name, this.createControl(config));
        });

    }
  }

  createGroup(): any {
    const group = this.fb.group({});
    this.controls.forEach((control: any) => group.addControl(control.name, this.createControl(control)));
    return group;
  }

  createControl(config: FieldConfig): any {
    const { disabled, validation, value } = config;
    return this.fb.control({ disabled, value }, validation);
  }

  setValue(): void {
    if (this.configData.formValues) {
      for (const [k, v] of Object.entries(this.configData.formValues)) {
        if (k !== "id" && k !== "createdDate" && k !== "lastModifiedDate") {
          this.form.controls[k].setValue(v, { emitEvent: true });
        }
      }
    }
  }
}
