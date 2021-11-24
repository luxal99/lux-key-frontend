import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Key } from "../../../models/key";
import { KeyService } from "../../../service/key.service";
import { DialogUtil } from "../../../util/dialog-util";
import { KeyOverviewDialogComponent } from "../key/key-overview-dialog/key-overview-dialog.component";
import { DialogOptions } from "../../../util/dialog-options";
import { MatDialog } from "@angular/material/dialog";
import { EditKeyDialogComponent } from "../key/edit-key-dialog/edit-key-dialog.component";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.sass"],
})
export class DashboardComponent implements OnInit {


  listOfKey: Key[] = [];
  searchText = "";

  constructor(private keyService: KeyService, private dialog: MatDialog) {
  }

  searchForm = new FormGroup({
    search: new FormControl({}),
  });

  ngOnInit(): void {
  }

  inputChange(): void {
    if (this.searchText.length === 0) {
      // @ts-ignore
      document.getElementById("search").style.display = "none";
      // @ts-ignore
      document.getElementById("huge-label").style.display = "block";

      // @ts-ignore
      document.getElementById("centered").style.minHeight = "70vh";
      this.listOfKey = [];
    } else if (this.searchText.length > 1) {
      // @ts-ignore
      document.getElementById("search").style.display = "block";
      // @ts-ignore
      document.getElementById("huge-label").style.display = "none";
      // @ts-ignore
      document.getElementById("centered").style.minHeight = "30vh";
      this.search();
    }
  }

  showSearch(element: HTMLInputElement): void {
    document.getElementById("search").style.display = "block";
    // @ts-ignore
    document.getElementById("huge-label").style.display = "none";
    element.focus();
  }

  focusOnInput(element: any): void {
    element.click();
  }

    search(): void {
    this.keyService.searchKey(this.searchText).subscribe((resp) => {
      this.listOfKey = resp;
    });
  }

  openKeyOverviewDialog(key: Key): void {
    DialogUtil.openDialog(KeyOverviewDialogComponent, DialogOptions.setDialogConfig({
      position: { top: "6%" },
      width: "30%",
      data: key,
    }), this.dialog);
  }

  openEditKeyDialog(key: Key): void {
    DialogUtil.openDialog(EditKeyDialogComponent, DialogOptions.setDialogConfig({
      position: { top: "1%" },
      width: "30%",
      data: key,
    }), this.dialog).afterClosed().subscribe(() => {
      this.inputChange();
    });
  }
}
