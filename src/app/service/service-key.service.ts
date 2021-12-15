import { Injectable } from "@angular/core";
import { GenericService } from "./generic.service";
import { ServiceKey } from "../models/serviceKey";
import { RestRoutes } from "../constant/const";

@Injectable({
  providedIn: "root"
})
export class ServiceKeyService extends GenericService<ServiceKey> {
  route = RestRoutes.SERVICE_KEY;
}
