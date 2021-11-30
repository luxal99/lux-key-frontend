import { Component, OnInit } from '@angular/core';
import { KeyService } from '../../../service/key.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarUtil } from '../../../util/snackbar-util';
import { Report } from '../../../models/Report';
import { ReportService } from '../../../service/report.service';
import * as moment from 'moment';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.sass'],
})
export class ReportsComponent implements OnInit {

  currentDate = moment(new Date()).format('DD-MM-YYYY');
  listOfReports: Report[] = [];

  constructor(private keyService: KeyService, private snackBar: MatSnackBar,
              private reportService: ReportService) {
  }

  ngOnInit(): void {
    this.getReports();
  }

  getReports(): void {
    this.reportService.getAll().subscribe((resp) => {
      this.listOfReports = resp;
    });
  }

  generate(): void {
    this.keyService.generateKeyServiceCountStatus().subscribe(() => {
      SnackBarUtil.openSnackBar(this.snackBar, 'Uspešno generisano');
      this.getReports()
    }, () => {
      SnackBarUtil.openSnackBar(this.snackBar, 'Dogodila se greška');
    });
  }

  deleteReport(id: number) {
    this.reportService.delete(id).subscribe(() => {
      SnackBarUtil.openSnackBar(this.snackBar, 'Uspešno obrisano');
      this.getReports();
    }, () => {
      SnackBarUtil.openSnackBar(this.snackBar, 'Dogodila se greška');
    });
  }
}
