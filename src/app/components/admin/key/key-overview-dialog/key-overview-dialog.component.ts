import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Key } from "../../../../models/key";
import { isNumeric } from "rxjs/internal-compatibility";
import { KeyService } from "../../../../service/key.service";

@Component({
  selector: "app-key-overview-dialog",
  templateUrl: "./key-overview-dialog.component.html",
  styleUrls: ["./key-overview-dialog.component.sass"]
})
export class KeyOverviewDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Key,
              private keyService: KeyService) {
  }

  ngOnInit(): void {
    this.findKeyIfDataIsNumber();
  }

  findKeyIfDataIsNumber() {
    if (Object.keys(this.data).length === 1) {
      this.keyService.findById(this.data.id).subscribe((resp) => {
        this.data = resp;
      });
    }
  }

}
