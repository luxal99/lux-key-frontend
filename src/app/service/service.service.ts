import { Injectable } from "@angular/core";
import { GenericService } from "./generic.service";
import { Service } from "../models/service";
import { RestRoutes } from "../constant/const";
import { Observable } from "rxjs";
import { HttpResponse } from "@angular/common/http";
import { DateDto } from "../models/dto/query/DateDto";

@Injectable({
  providedIn: "root"
})
export class ServiceService extends GenericService<Service> {
  route = RestRoutes.SERVICE;

  generateBuiltInReport(dateQuery: DateDto): Observable<any> {
    return this.http.post(this.route + "/generate-built-in", dateQuery, { responseType: "text" });
  }

  findServiceByDate(q: string): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(this.route, {
      responseType: "json",
      observe: "response",
      params: { q }
    });
  }
}
