import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GenericService } from "./generic.service";
import { RestRoutes } from "../constant/const";
import { KeyImage } from "../models/KeyImage";

@Injectable({
  providedIn: "root"
})
export class KeyImageService extends GenericService<KeyImage> {

  route = RestRoutes.KEY_IMAGE;

  addImage(idKey: any, formData: FormData): Observable<any> {
    return this.http.put("/key-image/" + `upload/${idKey}`, formData, { responseType: "json" });
  }
}
