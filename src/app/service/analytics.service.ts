import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { EarningByKeySubCategoryDto } from "../models/dto/EarningByKeySubCategoryDto";
import { PopularKeyDto } from "../models/dto/PopularKeyDto";
import { AllTimeEarnedDto } from "../models/dto/AllTimeEarnedDto";

@Injectable({
  providedIn: "root"
})
export class AnalyticsService {

  ROUTE = "/analytics/";

  constructor(private http: HttpClient) {
  }

  getAllTimeEarned(): Observable<AllTimeEarnedDto> {
    return this.http.get<AllTimeEarnedDto>(this.ROUTE + "all-time-earned",
      { responseType: "json" });
  }

  getEarningByKeySubCategory(): Observable<EarningByKeySubCategoryDto[]> {
    return this.http.get<EarningByKeySubCategoryDto[]>(this.ROUTE + "earning-by-key-sub-category",
      { responseType: "json" });
  };

  getTopFivePopularKeys(): Observable<PopularKeyDto[]> {
    return this.http.get<PopularKeyDto[]>(this.ROUTE + "top-five",
      { responseType: "json" });
  };
}
