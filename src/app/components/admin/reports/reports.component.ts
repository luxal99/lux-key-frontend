import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarUtil } from "../../../util/snackbar-util";
import { Report } from "../../../models/Report";
import { ReportService } from "../../../service/report.service";
import * as moment from "moment";
import { ServiceService } from "../../../service/service.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { DialogUtil } from "../../../util/dialog-util";
import { DateQueryDialogComponent } from "./date-query-dialog/date-query-dialog.component";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.sass"],
})
export class ReportsComponent implements OnInit {
  currentDate = moment(new Date()).format("DD-MM-YYYY");
  listOfReports: Report[] = [];

  constructor(
    private serviceService: ServiceService,
    private snackBar: MatSnackBar,
    private reportService: ReportService,
    private dialog:MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getReports();
  }

  getReports(): void {
  }

  generate(): void {
    DialogUtil.openDialog(DateQueryDialogComponent,{},this.dialog).afterClosed().subscribe((resp)=>{
      this.serviceService.generateBuiltInReport(resp).subscribe(
        () => {
          SnackBarUtil.openSnackBar(this.snackBar, "Uspešno generisano");
          this.getReports();
        },
        () => {
          SnackBarUtil.openSnackBar(this.snackBar, "Dogodila se greška");
        }
      );
    })
  }

  deleteReport(id: number) {
    this.reportService.delete(id).subscribe(
      () => {
        SnackBarUtil.openSnackBar(this.snackBar, "Uspešno obrisano");
        this.getReports();
      },
      () => {
        SnackBarUtil.openSnackBar(this.snackBar, "Dogodila se greška");
      }
    );
  }
}
