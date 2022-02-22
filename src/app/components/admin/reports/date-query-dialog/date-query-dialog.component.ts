import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import * as moment from "moment";
import { DATE_VALUE_FORMAT, FormControlNames } from "../../../../constant/const";

@Component({
  selector: "app-date-query-dialog",
  templateUrl: "./date-query-dialog.component.html",
  styleUrls: ["./date-query-dialog.component.sass"]
})
export class DateQueryDialogComponent implements OnInit {
  dateForm = new FormGroup({
    startDate: new FormControl(Validators.required),
    endDate: new FormControl(Validators.required),
  });

  constructor(private dialogRef: MatDialogRef<DateQueryDialogComponent>,
  ) {
  }

  ngOnInit(): void {
  }

  getDateQuery() {
    this.dialogRef.close({
      startDate: moment(this.dateForm.get(FormControlNames.START_DATE_FORM_CONTROL).value).format(DATE_VALUE_FORMAT),
      endDate: moment(this.dateForm.get(FormControlNames.END_DATE_FORM_CONTROL).value).format(DATE_VALUE_FORMAT)
    });
  }
}
