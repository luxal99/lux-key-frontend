import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Key} from '../../../../models/key';

@Component({
  selector: 'app-key-overview-dialog',
  templateUrl: './key-overview-dialog.component.html',
  styleUrls: ['./key-overview-dialog.component.sass']
})
export class KeyOverviewDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Key) {
  }

  ngOnInit(): void {
    console.log(this.data);
  }

}
