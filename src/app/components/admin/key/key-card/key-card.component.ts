import { Component, OnInit, ViewChild } from '@angular/core';
import { KeyService } from '../../../../service/key.service';
import { KeyBehaviorService } from '../../../../service/util/key-behavior.service';
import { Key } from '../../../../models/key';
import { DialogUtil } from '../../../../util/dialog-util';
import { EditKeyDialogComponent } from '../edit-key-dialog/edit-key-dialog.component';
import { DialogOptions } from '../../../../util/dialog-options';
import { KeyOverviewDialogComponent } from '../key-overview-dialog/key-overview-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSpinner } from '@angular/material/progress-spinner';
import { SpinnerService } from '../../../../service/spinner-service.service';
import { ConfirmDialogComponent } from '../../../confirm-dialog/confirm-dialog.component';
import { BehaviorSubject } from 'rxjs';
import { AddKeyDialogComponent } from '../add-key-dialog/add-key-dialog.component';

@Component({
  selector: 'app-key-card',
  templateUrl: './key-card.component.html',
  styleUrls: ['./key-card.component.sass'],
})
export class KeyCardComponent implements OnInit {

  @ViewChild('spinner') spinner!: MatSpinner;
  searchForm = new FormGroup({
    search: new FormControl(),
    carBrand: new FormControl(''),
  });
  searchText = '';

  dialogResult = new BehaviorSubject(false);

  listOfKeys: Key[] = [];

  constructor(private keyService: KeyService, private dialog: MatDialog,
              private keyBehaviorService: KeyBehaviorService, private spinnerService: SpinnerService) {
  }

  ngOnInit(): void {
    this.getKeysBySubCategory();
  }

  getKeysBySubCategory(): void {
    this.keyService.findKeyByKeySubCategory(this.keyBehaviorService.getIdKeySubCategory()).subscribe((resp) => {
      this.listOfKeys = resp;
      this.spinnerService.hide(this.spinner);
    });
  }

  openEditKeyDialog(key: Key): void {
    DialogUtil.openDialog(EditKeyDialogComponent, DialogOptions.setDialogConfig({
      position: { top: '1%' },
      width: '30%',
      data: key,
    }), this.dialog).afterClosed().subscribe(() => {
      this.getKeysBySubCategory();
    });
  }

  openKeyOverviewDialog(key: Key): void {
    DialogUtil.openDialog(KeyOverviewDialogComponent, DialogOptions.setDialogConfig({
      position: { top: '6%' },
      width: '30%',
      data: key,
    }), this.dialog);
  }

  openAddKeyDialog(): void {
    DialogUtil.openDialog(AddKeyDialogComponent, DialogOptions.setDialogConfig({
      position: { top: '6%' },
      width: '30%',
    }), this.dialog).afterClosed().subscribe(() => {
      this.getKeysBySubCategory();
    });
  }


  deleteKey(id: number): void {
    DialogUtil.openDialog(ConfirmDialogComponent, DialogOptions.setDialogConfig({
      width: '30%',
      data: 'Da li ste sigurni ?',
    }), this.dialog).afterClosed().subscribe((result) => {
      if (result) {
        this.spinnerService.show(this.spinner);
        this.keyService.delete(id).subscribe(() => {
          this.getKeysBySubCategory();
          this.spinnerService.hide(this.spinner);
        });
      }
    });
  }
}
