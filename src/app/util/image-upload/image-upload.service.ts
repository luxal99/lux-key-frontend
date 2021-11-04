import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ImageUploadService {

  private _fileUpload: any;
  private _isUploaded = false;

  get isUploaded(): boolean {
    return this._isUploaded;
  }


  get fileUpload(): any {
    return this._fileUpload;
  }

  set fileUpload(value: {}) {
    this._fileUpload = value;
  }

  constructor() {
  }

  addFiles(event: any): void {
    this._fileUpload = event.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(<Blob>this._fileUpload);
    reader.onload = () => {
      this._fileUpload.url = reader.result;
    };
  }

  clearUpload(): void {
    this._fileUpload = {};
  }

  uploadFinish(): void {
    this._isUploaded = true;
  }
}
