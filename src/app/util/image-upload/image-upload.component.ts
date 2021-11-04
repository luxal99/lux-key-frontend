import { Component, Input, OnInit } from "@angular/core";
import { ImageUploadService } from "./image-upload.service";
import { KeyImageService } from "../../service/key-image.service";
import { SnackBarUtil } from "../snackbar-util";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-image-upload",
  templateUrl: "./image-upload.component.html",
  styleUrls: ["./image-upload.component.sass"]
})
export class ImageUploadComponent implements OnInit {

  @Input() data: any;

  constructor(public imageUploadService: ImageUploadService, private snackBar: MatSnackBar,
              private keyImageService: KeyImageService) {
  }

  ngOnInit(): void {
  }

  uploadImage(idKey: any): void {
    if (this.imageUploadService.fileUpload) {
      const formData = new FormData();
      // @ts-ignore
      formData.append("image", this.imageUploadService.fileUpload);
      this.keyImageService.addImage(idKey, formData).subscribe((resp) => {
        SnackBarUtil.openSnackBar(this.snackBar, "Uspešno");
        this.imageUploadService.clearUpload();
      }, () => {
        SnackBarUtil.openSnackBar(this.snackBar, "Dogodila se greška");
        this.imageUploadService.clearUpload();
      });
    }
  }


}
