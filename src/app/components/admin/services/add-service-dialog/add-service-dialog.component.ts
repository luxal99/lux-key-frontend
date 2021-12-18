import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import * as moment from "moment";
import { ServiceService } from "../../../../service/service.service";
import { DefaultComponent } from "../../../../util/default-component";
import { Service } from "../../../../models/service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Key } from "../../../../models/key";
import { KeyService } from "../../../../service/key.service";
import {
  CLIENT_ID_PREFIX,
  FormControlNames,
  InputTypes,
  KEY_ID_PREFIX,
  SELECTED_CLASS_NAME,
} from "../../../../constant/const";
import * as ClassicEditor from "lib/ckeditor5-build-classic";
import { CKEditorComponent } from "@ckeditor/ckeditor5-angular";
import { ClientService } from "../../../../service/client.service";
import { Client } from "../../../../../client";
import { FormBuilderConfig } from "../../../../models/FormBuilderConfig";
import { DialogUtil } from "../../../../util/dialog-util";
import { FormBuilderComponent } from "../../../form-components/form-builder/form-builder.component";
import { DialogOptions } from "../../../../util/dialog-options";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { ServiceKeyService } from "../../../../service/service-key.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { PopularKeyDto } from "../../../../models/dto/PopularKeyDto";
import { AnalyticsService } from "../../../../service/analytics.service";

@Component({
  selector: "app-add-service-dialog",
  templateUrl: "./add-service-dialog.component.html",
  styleUrls: ["./add-service-dialog.component.sass"],
})
export class AddServiceDialogComponent
  extends DefaultComponent<Service>
  implements OnInit {
  @ViewChild("editor", { static: false }) editorComponent!: CKEditorComponent;
  public Editor = ClassicEditor;

  listOfTopFivePopularKeys: PopularKeyDto[] | any[] = [];
  listOfSelectedKeys: Key[] = [];
  listOfKeys: Key[] = [];

  listOfClients: Client[] = [];
  listOfSelectedClients: Client[] = [];

  selectedClient!: Client;

  currentDate = moment();

  searchForm = new FormGroup({
    search: new FormControl(""),
    searchClient: new FormControl(),
  });

  serviceForm = new FormGroup({
    date: new FormControl(
      this.data ? this.data.date : new Date(),
      Validators.required
    ),
  });

  total = 0;
  searchText = "";
  searchClientText = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Service,
    private serviceService: ServiceService,
    private keyService: KeyService,
    private clientService: ClientService,
    private dialog: MatDialog,
    private analyticsService: AnalyticsService,
    private serviceKeyService: ServiceKeyService,
    private sb: MatSnackBar
  ) {
    super(serviceService);
    this.snackBar = sb;
  }

  ngOnInit(): void {
    this.initValues();
    this.getClients();
    this.getTopFivePopularKeys();
  }

  initValues(): void {
    if (this.data) {
      setTimeout(() => {
        this.selectedClient = this.data.idClient;
        this.listOfSelectedKeys = this.data.serviceKeys.map(
          (item) => item.idKey
        );
        const clientRow: NodeListOf<any> =
          document.querySelectorAll(".client-row");
        clientRow.forEach((item: Element) => {
          if (item.id === CLIENT_ID_PREFIX + this.data.idClient.id) {
            item.classList.add(SELECTED_CLASS_NAME);
          }
        });
        const keyRow: NodeListOf<any> = document.querySelectorAll(".key-row");
        keyRow.forEach((item: Element) => {
          this.listOfSelectedKeys.filter((key) => {
            if (item.id === KEY_ID_PREFIX + key.id) {
              item.classList.add(SELECTED_CLASS_NAME);
            }
          });
        });
      }, 500);
    }
  }

  searchKey(): void {
    if (this.searchText.length > 2) {
      this.keyService.searchKey(this.searchText).subscribe((resp) => {
        this.listOfKeys = resp;
      });
    }
  }

  getClients(): void {
    this.clientService.getAll().subscribe((resp) => {
      this.listOfClients = resp;
    });
  }

  addKey(key: any): void {
    this.listOfSelectedKeys.push(key);
    this.total += key.idCurrentPrice.price;
  }

  removeKey(key): void {
    this.listOfSelectedKeys.splice(this.listOfSelectedKeys.indexOf(key), 1);
  }

  getTopFivePopularKeys() {
    this.analyticsService.getTopFivePopularKeys().subscribe((resp) => {
      this.listOfTopFivePopularKeys = resp;
      this.listOfTopFivePopularKeys = this.listOfTopFivePopularKeys.map(
        (item) => ({
          id: item.id,
          idCurrentPrice: { price: item.price },
          code: item.code,
          amount: item.amount,
        })
      );
    });
  }

  openAddClientDialog(): void {
    const configData: FormBuilderConfig = {
      formFields: [
        {
          name: FormControlNames.FIRST_NAME_FORM_CONTROL,
          type: InputTypes.INPUT,
          validation: [Validators.required],
          label: "Ime",
        },
        {
          name: FormControlNames.LAST_NAME_FORM_CONTROL,
          type: InputTypes.INPUT,
          validation: [Validators.required],
          label: "Prezime",
        },
        {
          name: FormControlNames.TELEPHONE_FORM_CONTROL,
          type: InputTypes.INPUT,
          validation: [Validators.required],
          label: "Kontakt telefon",
        },
      ],
      headerText: "Dodaj klijenta",
      service: this.clientService,
    };
    DialogUtil.openDialog(
      FormBuilderComponent,
      DialogOptions.setDialogConfig({
        position: { top: "6%" },
        width: "30%",
        data: configData,
      }),
      this.dialog
    )
      .afterClosed()
      .subscribe(() => {
        this.getClients();
      });
  }

  selectClient(client: Client, $event: any): void {
    const element: HTMLElement = $event.target;
    const otherSelectedElements = document.querySelectorAll(".selected");
    [].forEach.call(otherSelectedElements, (el: any) => {
      el.classList.remove("selected");
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
    this.getSpinnerService.show(this.spinner);
    const service: Service = this.serviceForm.getRawValue();
    service.notes = this.editorComponent.editorInstance.getData();
    service.idClient = this.selectedClient;
    service.date = moment(service.date).format("YYYY-MM-DD");
    service.serviceKeys = this.listOfSelectedKeys.map((item) => ({
      idKey: { id: item.id, amount: item.amount },
      keyPrice: item.idCurrentPrice.price,
    }));

    service.gross = 0;

    service.serviceKeys.forEach(
      (item) => {
        service.gross += item.keyPrice;
      }
    );

    service.serviceKeys = [...new Map(this.listOfSelectedKeys.map((item) => ({
      id: item.id,
      amount: item.amount,
      decrement: this.countOccurrence(item),
      keyPrice:item.idCurrentPrice.price
    })).map(item => [item["id"], item])).values()];

    if (this.data) {
      service.id = this.data.id;
      this.getSpinnerService.hide(this.spinner);
      super.update(service);
    } else {
      super.save(service);
      this.getSpinnerService.hide(this.spinner);
    }
  }

  countOccurrence(key: Key): number {
    return this.listOfSelectedKeys.filter((item) => item.id === key.id).length;
  }
}
