import { Injectable } from "@angular/core";
import { RestRoutes } from "../constant/const";
import { GenericService } from "./generic.service";
import { Client } from "../../client";

@Injectable({
  providedIn: "root"
})
export class ClientService extends GenericService<Client> {
  route = RestRoutes.CLIENT;
}
