import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {ServiceService} from '../../../../service/service.service';
import {DefaultComponent} from '../../../../util/default-component';
import {Service} from '../../../../models/service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Key} from '../../../../models/key';
import {KeyService} from '../../../../service/key.service';
import {FieldConfig} from '../../../../models/FieldConfig';
import {DEFAULT_BTN_CLASS_NAME, FormControlNames, InputTypes, SELECTED_KEY_CLASS_NAME} from '../../../../constant/const';
import {ServiceTypeEnum} from '../../../../ServiceTypeEnum';
import * as ClassicEditor from 'lib/ckeditor5-build-classic';
import {CKEditorComponent} from '@ckeditor/ckeditor5-angular';
import {Event} from '@angular/router';
import {Element} from '@angular/compiler';
import {ClientService} from '../../../../service/client.service';
import {Client} from '../../../../../client';

@Component({
  selector: 'app-add-service-dialog',
  templateUrl: './add-service-dialog.component.html',
  styleUrls: ['./add-service-dialog.component.sass']
})
export class AddServiceDialogComponent extends DefaultComponent<Service> implements OnInit {

  @ViewChild('editor', {static: false}) editorComponent!: CKEditorComponent;
  public Editor = ClassicEditor;

  listOfSelectedKeys: Key[] = [];
  listOfKeys: Key[] = [];

  listOfClients: Client[] = [];
  listOfSelectedClients: Client[] = [];

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

  constructor(private serviceService: ServiceService, private keyService: KeyService, private clientService: ClientService) {
    super(serviceService);
  }

  ngOnInit(): void {
    this.getKeys();
    this.getClients();
  }

  getKeys(): void {
    this.keyService.getAll().subscribe((resp) => {
      this.listOfKeys = resp;
    });
  }

  getClients(): void {
    this.clientService.getAll().subscribe((resp) => {
      this.listOfClients = resp;
    });
  }

  selectServiceType($event: any): void {
    const codingBtn = document.getElementById('kodiranje');
    const productionBtn = document.getElementById('izrada');
    if (($event.target.id as string).toUpperCase() === ServiceTypeEnum.CODING) {
      codingBtn.classList.remove('inactive-btn');
      productionBtn.classList.add('inactive-btn');
      if (productionBtn.classList.contains(DEFAULT_BTN_CLASS_NAME)) {
        productionBtn.classList.remove(DEFAULT_BTN_CLASS_NAME);
      }
      $event.target.classList.add('default-btn');
      this.selectedServiceType = ServiceTypeEnum.CODING;
    } else if (($event.target.id as string).toUpperCase() === ServiceTypeEnum.PRODUCTION) {
      productionBtn.classList.remove('inactive-btn');
      codingBtn.classList.add('inactive-btn');
      if (codingBtn.classList.contains(DEFAULT_BTN_CLASS_NAME)) {
        codingBtn.classList.remove(DEFAULT_BTN_CLASS_NAME);
      }
      $event.target.classList.add('default-btn');
      this.selectedServiceType = ServiceTypeEnum.PRODUCTION;
    }
  }


  addKey(key: Key, $event: any): void {
    const element: HTMLElement = $event.target;
    if (element.classList.contains(SELECTED_KEY_CLASS_NAME)) {
      element.classList.remove(SELECTED_KEY_CLASS_NAME);
      this.listOfSelectedKeys.splice(this.listOfSelectedKeys.indexOf(key), 1);
    } else {
      element.classList.add(SELECTED_KEY_CLASS_NAME);
      this.listOfSelectedKeys.push(key);
    }
  }

  saveService(): void {
    const service: Service = this.serviceForm.getRawValue();
    service.note = this.editorComponent.editorInstance.getData();
  }

  openAddClientDialog(): void {

  }
}
