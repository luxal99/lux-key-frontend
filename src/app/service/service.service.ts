import { Injectable } from "@angular/core";
import { GenericService } from "./generic.service";
import { Service } from "../models/service";
import { RestRoutes, TOKEN_NAME } from "../constant/const";
import { Observable } from "rxjs";
import { Token } from "@angular/compiler";

@Injectable({
  providedIn: "root"
})
export class ServiceService extends GenericService<Service> {
  route = RestRoutes.SERVICE;

  findServiceByDate(startDate: string, endDate: string): Observable<Service[]> {
    return this.http.get<Service[]>(this.route + "?startDate=" + startDate + "&endDate=" + endDate, {
      responseType: "json"
    });
  }
}
