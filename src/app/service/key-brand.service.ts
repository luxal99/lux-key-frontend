import { Injectable } from "@angular/core";
import { GenericService } from "./generic.service";
import { RestRoutes } from "../constant/const";
import { KeyBrand } from "../models/KeyBrand";

@Injectable({
  providedIn: "root",
})
export class KeyBrandService extends GenericService<KeyBrand> {
  route = RestRoutes.KEY_BRAND;
}
