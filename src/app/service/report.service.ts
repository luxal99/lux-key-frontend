import { Injectable } from "@angular/core";
import { GenericService } from "./generic.service";
import { Report } from "../models/Report";
import { RestRoutes } from "../constant/const";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ReportService extends GenericService<Report> {
  route = RestRoutes.REPORT;

  getGroupedReports(): Observable<any> {
    return this.http.get(this.route + "/grouped");
  }
}
