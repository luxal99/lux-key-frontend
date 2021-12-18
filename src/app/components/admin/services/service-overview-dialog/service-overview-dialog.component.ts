import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { Service } from "../../../../models/service";
import { Key } from "../../../../models/key";
import { DialogUtil } from "../../../../util/dialog-util";
import { KeyOverviewDialogComponent } from "../../key/key-overview-dialog/key-overview-dialog.component";
import { DialogOptions } from "../../../../util/dialog-options";

@Component({
  selector: "app-service-overview-dialog",
  templateUrl: "./service-overview-dialog.component.html",
  styleUrls: ["./service-overview-dialog.component.sass"],
})
export class ServiceOverviewDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Service,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openKeyOverviewDialog(key: Key): void {
    DialogUtil.openDialog(KeyOverviewDialogComponent, DialogOptions.setDialogConfig({
      position: { top: "6%" },
      width: "30%",
      data: key,
    }), this.dialog);
  }

  countOccurrence(key: Key): number {
    return this.data.serviceKeys.filter((item) => item.id === key.id).length;
  }
}
