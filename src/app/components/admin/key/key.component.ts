import {Component, OnInit} from '@angular/core';
import {DefaultComponent} from '../../../util/default-component';
import {Key} from '../../../models/key';
import {KeyService} from '../../../service/key.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {DialogUtil} from '../../../util/dialog-util';
import {AddKeyDialogComponent} from './add-key-dialog/add-key-dialog.component';
import {DialogOptions} from '../../../util/dialog-options';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.sass']
})
export class KeyComponent extends DefaultComponent<Key> implements OnInit {

  constructor(private keyService: KeyService, private sb: MatSnackBar, private dialog: MatDialog) {
    super(keyService);
  }

  initSnackBar(): void {
    this.setSnackBar = this.sb;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.initSnackBar();
  }

  openAddKeyDialog(key?: Key): void {
    DialogUtil.openDialog(AddKeyDialogComponent, DialogOptions.setDialogConfig({
      position: {top: '6%'},
      width: '30%',
      data: key
    }), this.dialog).afterClosed().subscribe(() => {
      this.getAll();
    });
  }

}
