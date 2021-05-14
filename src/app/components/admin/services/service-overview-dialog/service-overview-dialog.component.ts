import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Service} from '../../../../models/service';

@Component({
  selector: 'app-service-overview-dialog',
  templateUrl: './service-overview-dialog.component.html',
  styleUrls: ['./service-overview-dialog.component.sass']
})
export class ServiceOverviewDialogComponent implements OnInit {

  sumOfKeyProfits = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Service) {
  }

  ngOnInit(): void {
    this.getKeyProfits();
  }

  getKeyProfits(): void {
    this.data.serviceKeys.forEach((serviceKey) => {
      this.sumOfKeyProfits += serviceKey.keyPrice - serviceKey.keyPurchasePrice;
    });
  }

}
