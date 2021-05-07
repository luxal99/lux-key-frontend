import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {GenericService} from '../service/generic.service';
import {SpinnerService} from '../service/spinner-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSpinner} from '@angular/material/progress-spinner';
import {Crud} from './crud-interface';
import {Observable} from 'rxjs';
import * as moment from 'moment';

@Component({
  template: '',
  providers: [SpinnerService]
})
export abstract class DefaultComponent<T> implements OnInit, Crud {

  @Injectable() private spinnerService: SpinnerService = new SpinnerService();
  private snackBar: MatSnackBar;
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
    return this.snackBar;
  }

  delete(): void {
  }

  set setSnackBar(snackBar: MatSnackBar) {
    this.snackBar = snackBar;
  }

  getAll(): void {
    this.genericService.getAll().subscribe((data) => {
      this.listOfItems = data;
      // @ts-ignore
      this.listOfItems.filter((item) => item.createdDate ? item.createdDate = moment(item.createdDate).format('DD MMMM YYYY') : '');
      this.spinnerService.hide(this.spinner);
    });
  }

  save(): void {
  }

  update(): void {
  }
}
