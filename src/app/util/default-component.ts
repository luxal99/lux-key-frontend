import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {GenericService} from '../service/generic.service';
import {SpinnerService} from '../service/spinner-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSpinner} from '@angular/material/progress-spinner';
import {Crud} from './crud-interface';
import {Observable} from 'rxjs';

@Component({
  template: ''
})
export abstract class DefaultComponent<T> implements OnInit, Crud {

  @Injectable() private spinnerService: SpinnerService;
  @Injectable() private snackBar: MatSnackBar;
  @ViewChild('spinner') spinner: MatSpinner;

  private listOfItems: T[] = [];

  protected constructor(private genericService: GenericService<T>) {
  }

  ngOnInit(): void {
  }


  get getSpinnerService(): SpinnerService {
    return this.spinnerService;
  }

  get getSnackBar(): MatSnackBar {
    return this.snackBar;
  }

  // @ts-ignore
  set setListOfItems(arr: T[]): void {
    this.listOfItems = arr;
  }

  get getListOfItems(): T[] {
    return this.listOfItems;
  }

  delete(): void {
  }

  getAll(): void {
    this.genericService.getAll().subscribe((data) => {
      // @ts-ignore
      this.setListOfItems(data);
    });
  }

  save(): void {
  }

  update(): void {
  }
}
