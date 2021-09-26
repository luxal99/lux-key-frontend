import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { GenericService } from '../service/generic.service';
import { SpinnerService } from '../service/spinner-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSpinner } from '@angular/material/progress-spinner';
import { Crud } from './crud-interface';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { SnackBarUtil } from './snackbar-util';
import { Message } from '../constant/const';

@Component({
  template: '',
  providers: [SpinnerService],
})
export abstract class DefaultComponent<T> implements OnInit, Crud {

  @Injectable() private spinnerService: SpinnerService = new SpinnerService();
  // tslint:disable-next-line:variable-name
  private _snackBar: MatSnackBar;
  @ViewChild('spinner') spinner: MatSpinner;

  listOfItems: T[] = [];

  protected constructor(private genericService: GenericService<T>) {
  }

  ngOnInit(): void {
    this.getAll();
  }


  get getSpinnerService(): SpinnerService {
    return this.spinnerService;
  }

  get getSnackBar(): MatSnackBar {
    return this._snackBar;
  }

  delete(id: number): void {
    this.spinnerService.show(this.spinner);
    this.genericService.delete(id).subscribe(() => {
      SnackBarUtil.openSnackBar(this._snackBar, Message.SUCCESS);
      this.spinnerService.hide(this.spinner);
      this.getAll();
    }, () => {
      SnackBarUtil.openSnackBar(this._snackBar, Message.ERR);
      this.spinnerService.hide(this.spinner);
    });
  }


  set snackBar(value: MatSnackBar) {
    this._snackBar = value;
  }

  getAll(): void {
    this.genericService.getAll().subscribe((data) => {
      this.listOfItems = data;
      // @ts-ignore
      this.listOfItems.filter((item) => item.createdDate ? item.createdDate = moment(item.createdDate).format('DD MMMM YYYY') : '');
      // @ts-ignore
      this.listOfItems.filter((item) => item.date ? item.date = moment(item.date).format('DD MMMM YYYY') : '');
      this.spinnerService.hide(this.spinner);
    });
  }

  save(entity: T): void {
    this.spinnerService.show(this.spinner);
    this.genericService.save(entity).subscribe(() => {
      SnackBarUtil.openSnackBar(this._snackBar, Message.SUCCESS);
      this.spinnerService.hide(this.spinner);
    }, (err) => {
      SnackBarUtil.openSnackBar(this._snackBar, Message.ERR);
      this.spinnerService.hide(this.spinner);
    });
  }

  genericSubscribe(observable: Observable<any>, callBack?: any): void {
    this.spinnerService.show(this.spinner);
    observable.subscribe(() => {
      if (callBack()) {
        callBack();
      }
      SnackBarUtil.openSnackBar(this._snackBar, Message.SUCCESS);
      this.spinnerService.hide(this.spinner);
    }, () => {
      SnackBarUtil.openSnackBar(this._snackBar, Message.ERR);
      this.spinnerService.hide(this.spinner);
    });
  }

  async genericPromiseSubscribe(observable: Observable<any>, callBack?: () => {}): Promise<any> {
    this.spinnerService.show(this.spinner);
    try {
      SnackBarUtil.openSnackBar(this._snackBar, Message.SUCCESS);
      this.spinnerService.hide(this.spinner);
      return await observable.toPromise();
    } catch (e) {
      SnackBarUtil.openSnackBar(this._snackBar, Message.ERR);
      this.spinnerService.hide(this.spinner);
    }
  }

  async saveToPromise(entity: T): Promise<T> {
    this.spinnerService.show(this.spinner);
    try {
      SnackBarUtil.openSnackBar(this._snackBar, Message.SUCCESS);
      this.spinnerService.hide(this.spinner);
      return await this.genericService.save(entity).toPromise();
    } catch (e) {
      SnackBarUtil.openSnackBar(this._snackBar, Message.ERR);
      this.spinnerService.hide(this.spinner);
    }
  }

  update(entity: T): void {
    this.genericService.update(entity).subscribe(() => {
      SnackBarUtil.openSnackBar(this._snackBar, Message.SUCCESS);
      this.spinnerService.hide(this.spinner);
    }, () => {
      SnackBarUtil.openSnackBar(this._snackBar, Message.ERR);
      this.spinnerService.hide(this.spinner);
    });
  }
}
