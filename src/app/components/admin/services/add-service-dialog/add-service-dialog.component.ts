import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {ServiceService} from '../../../../service/service.service';
import {DefaultComponent} from '../../../../util/default-component';
import {Service} from '../../../../models/service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Key} from '../../../../models/key';
import {KeyService} from '../../../../service/key.service';
import {FieldConfig} from '../../../../models/FieldConfig';
import {
  DEFAULT_BTN_CLASS_NAME,
  FormControlNames,
  InputTypes, Message,
  SELECTED_CLASS_NAME,
} from '../../../../constant/const';
import {ServiceTypeEnum} from '../../../../ServiceTypeEnum';
import * as ClassicEditor from 'lib/ckeditor5-build-classic';
import {CKEditorComponent} from '@ckeditor/ckeditor5-angular';
import {ClientService} from '../../../../service/client.service';
import {Client} from '../../../../../client';
import {FormBuilderConfig} from '../../../../models/FormBuilderConfig';
import {DialogUtil} from '../../../../util/dialog-util';
import {FormBuilderComponent} from '../../../form-components/form-builder/form-builder.component';
import {DialogOptions} from '../../../../util/dialog-options';
import {MatDialog} from '@angular/material/dialog';
import {ServiceKey} from '../../../../models/serviceKey';
import {ServiceKeyService} from '../../../../service/service-key.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackBarUtil} from '../../../../util/snackbar-util';

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

  selectedClient!: Client;

  currentDate = moment();
  selectedServiceType = '';

  searchForm = new FormGroup({
    search: new FormControl(''),
    searchClient: new FormControl()

  });


  serviceForm = new FormGroup({
    date: new FormControl(new Date(), Validators.required),
    gross: new FormControl()
  });
  grossInputConfig: FieldConfig = {name: FormControlNames.GROSS_FORM_CONTROL, type: InputTypes.TEXT, label: 'Ukupno'};
  searchText = '';
  searchClientText = '';

  constructor(private serviceService: ServiceService, private keyService: KeyService,
              private clientService: ClientService, private dialog: MatDialog, private serviceKeyService: ServiceKeyService,
              private sb: MatSnackBar) {
    super(serviceService);
    this.snackBar = sb;
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
    if (element.classList.contains(SELECTED_CLASS_NAME)) {
      element.classList.remove(SELECTED_CLASS_NAME);
      this.listOfSelectedKeys.splice(this.listOfSelectedKeys.indexOf(key), 1);
    } else {
      element.classList.add(SELECTED_CLASS_NAME);
      this.listOfSelectedKeys.push(key);
    }
  }

  openAddClientDialog(): void {
    const configData: FormBuilderConfig = {
      formFields: [
        {
          name: FormControlNames.FIRST_NAME_FORM_CONTROL,
          type: InputTypes.INPUT,
          validation: [Validators.required],
          label: 'Ime'
        },
        {
          name: FormControlNames.LAST_NAME_FORM_CONTROL,
          type: InputTypes.INPUT,
          validation: [Validators.required],
          label: 'Prezime'
        },
        {
          name: FormControlNames.TELEPHONE_FORM_CONTROL,
          type: InputTypes.INPUT,
          validation: [Validators.required],
          label: 'Kontakt telefon'
        }
      ],
      headerText: 'Dodaj klijenta',
      service: this.clientService

    };
    DialogUtil.openDialog(FormBuilderComponent,
      DialogOptions.setDialogConfig({
        position: {top: '6%'},
        width: '30%',
        data: configData
      }), this.dialog).afterClosed().subscribe(() => {
      this.getClients();
    });
  }

  selectClient(client: Client, $event: any): void {
    const element: HTMLElement = $event.target;
    const otherSelectedElements = document.querySelectorAll('.selected');
    [].forEach.call(otherSelectedElements, (el: any) => {
      el.classList.remove('selected');
    });


    if (element.classList.contains(SELECTED_CLASS_NAME)) {
      this.selectedClient = null;
      element.classList.remove(SELECTED_CLASS_NAME);
    } else {
      element.classList.add(SELECTED_CLASS_NAME);
      this.selectedClient = client;
    }
  }

  async saveService(): Promise<void> {
    const service: Service = this.serviceForm.getRawValue();
    service.notes = this.editorComponent.editorInstance.getData();
    service.idClient = this.selectedClient;
    service.serviceType = this.selectedServiceType.toUpperCase();

    service.date = moment(service.date).format('YYYY-MM-DD');
    this.serviceService.save(service).subscribe((response) => {
      SnackBarUtil.openSnackBar(this.getSnackBar, Message.SUCCESS);

      for (const key of this.listOfSelectedKeys) {
        const serviceKey: ServiceKey = {
          idService: response,
          idKey: key,
          keyPrice: key.idCurrentPrice.price
        };

        super.genericSubscribe(this.serviceKeyService.save(serviceKey));
      }
    }, () => {
      SnackBarUtil.openSnackBar(this.getSnackBar, Message.ERR);
    });
  }
}