import { Component, OnInit } from "@angular/core";
import { AnalyticsService } from "../../../service/analytics.service";
import { AllTimeEarnedDto } from "../../../models/dto/AllTimeEarnedDto";
import { PopularKeyDto } from "../../../models/dto/PopularKeyDto";
import { EarningByKeySubCategoryDto } from "../../../models/dto/EarningByKeySubCategoryDto";

@Component({
  selector: "app-analytics",
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.sass"]
})
export class AnalyticsComponent implements OnInit {

  allTimeEarned: AllTimeEarnedDto;
  listOfTopFivePopularKeys: PopularKeyDto[] = [];
  listOfEarningsByKeySubCategory: EarningByKeySubCategoryDto[] = [];

  constructor(private analyticsService: AnalyticsService) {
  }

  ngOnInit(): void {
    this.getAllTimeEarned();
    this.getTopFivePopularKeys();
    this.getEarningByKeySubCategory();
  }

  getAllTimeEarned() {
    this.analyticsService.getAllTimeEarned().subscribe((resp) => {
      this.allTimeEarned = resp;
    });
  }

  getEarningByKeySubCategory() {
    this.analyticsService.getEarningByKeySubCategory().subscribe((resp) => {
      this.listOfEarningsByKeySubCategory = resp;
    });
  }

  getTopFivePopularKeys() {
    this.analyticsService.getTopFivePopularKeys().subscribe((resp) => {
      this.listOfTopFivePopularKeys = resp;
    });
  }


}
