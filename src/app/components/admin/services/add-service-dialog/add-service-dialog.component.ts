import {Component, ElementRef, OnInit} from '@angular/core';
import * as moment from 'moment';
import {ServiceService} from '../../../../service/service.service';
import {DefaultComponent} from '../../../../util/default-component';
import {Service} from '../../../../models/service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Key} from '../../../../models/key';
import {KeyService} from '../../../../service/key.service';
import {FieldConfig} from '../../../../models/FieldConfig';
import {FormControlNames, InputTypes} from '../../../../constant/const';
import {ServiceTypeEnum} from '../../../../ServiceTypeEnum';

@Component({
  selector: 'app-add-service-dialog',
  templateUrl: './add-service-dialog.component.html',
  styleUrls: ['./add-service-dialog.component.sass']
})
export class AddServiceDialogComponent extends DefaultComponent<Service> implements OnInit {

  listOfSelectedKeys: Key[] = [];
  listOfKeys: Key[] = [];
  currentDate = moment();
  selectedServiceType = '';

  searchForm = new FormGroup({
    search: new FormControl('')
  });


  serviceForm = new FormGroup({
    date: new FormControl(new Date(), Validators.required),
    gross: new FormControl()
  });
  grossInputConfig: FieldConfig = {name: FormControlNames.GROSS_FORM_CONTROL, type: InputTypes.TEXT, label: 'Ukupno'};
  searchText = '';

  constructor(private serviceService: ServiceService, private keyService: KeyService) {
    super(serviceService);
  }

  ngOnInit(): void {
    this.getKeys();
  }

  getKeys(): void {
    this.keyService.getAll().subscribe((resp) => {
      this.listOfKeys = resp;
    });
  }

  saveService(): void {
    const service: Service = this.serviceForm.getRawValue();
  }

  selectServiceType($event: any): void {
    const codingBtn = document.getElementById('kodiranje');
    const productionBtn = document.getElementById('izrada');
    if (($event.target.id as string).toUpperCase() === ServiceTypeEnum.CODING) {
      codingBtn.classList.remove('inactive-btn');
      productionBtn.classList.add('inactive-btn');
      productionBtn.classList.forEach((item) => {
        if (item === 'default-btn') {
          productionBtn.classList.remove(item);
        }
      });
      $event.target.classList.add('default-btn');
      this.selectedServiceType = ServiceTypeEnum.CODING;
    } else if (($event.target.id as string).toUpperCase() === ServiceTypeEnum.PRODUCTION) {
      productionBtn.classList.remove('inactive-btn');
      codingBtn.classList.add('inactive-btn');
      codingBtn.classList.forEach((item) => {
        if (item === 'default-btn') {
          codingBtn.classList.remove(item);
        }
      });
      $event.target.classList.add('default-btn');
      this.selectedServiceType = ServiceTypeEnum.PRODUCTION;
    }
  }

  addKey(key: Key): void {
    this.listOfSelectedKeys.push(key);
  }
}
