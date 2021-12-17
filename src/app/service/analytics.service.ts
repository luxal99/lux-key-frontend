import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { EarningByKeySubCategoryDto } from "../models/dto/EarningByKeySubCategoryDto";
import { PopularKeyDto } from "../models/dto/PopularKeyDto";
import { TotalEarning } from "../models/dto/TotalEarning";
import { MonthAnalyticsDto } from "../models/dto/MonthAnalyticsDto";

@Injectable({
  providedIn: "root",
})
export class AnalyticsService {
  ROUTE = "/analytics/";

  constructor(private http: HttpClient) {
  }

  getAllTimeEarned(): Observable<TotalEarning> {
    return this.http.get<TotalEarning>(this.ROUTE + "all-time-earned", {
      responseType: "json",
    });
  }

  getEarningByKeySubCategory(): Observable<EarningByKeySubCategoryDto[]> {
    return this.http.get<EarningByKeySubCategoryDto[]>(
      this.ROUTE + "earning-by-key-sub-category",
      { responseType: "json" }
    );
  }

  getTopFivePopularKeys(): Observable<PopularKeyDto[]> {
    return this.http.get<PopularKeyDto[]>(this.ROUTE + "top-five", {
      responseType: "json",
    });
  }

  getWorkServiceEarning(): Observable<TotalEarning> {
    return this.http.get<TotalEarning>(this.ROUTE + "work-service-earning", {
      responseType: "json",
    });
  }

  getEarningsByMonth(): Observable<MonthAnalyticsDto[]> {
    return this.http.get<MonthAnalyticsDto[]>(this.ROUTE + "earnings-by-month", {
      responseType: "json",
    });
  }
}
