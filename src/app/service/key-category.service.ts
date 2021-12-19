import { Injectable } from "@angular/core";
import { GenericService } from "./generic.service";
import { KeyCategory } from "../models/keyCategory";
import { RestRoutes } from "../constant/const";

@Injectable({
  providedIn: "root"
})
export class KeyCategoryService extends GenericService<KeyCategory> {
  route = RestRoutes.KEY_CATEGORY;
}
