import { Injectable } from "@angular/core";
import { GenericService } from "./generic.service";
import { KeyPrice } from "../models/keyPrice";
import { RestRoutes } from "../constant/const";

@Injectable({
  providedIn: "root"
})
export class KeyPriceService extends GenericService<KeyPrice> {
  route = RestRoutes.KEY_PRICE;
}
