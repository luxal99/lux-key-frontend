import { Injectable } from "@angular/core";
import { GenericService } from "./generic.service";
import { Report } from "../models/Report";
import { RestRoutes } from "../constant/const";

@Injectable({
  providedIn: "root",
})
export class ReportService extends GenericService<Report> {
  route = RestRoutes.REPORT;
}
