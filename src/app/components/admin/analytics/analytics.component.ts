import { Component, OnInit } from "@angular/core";
import { AnalyticsService } from "../../../service/analytics.service";
import { TotalEarning } from "../../../models/dto/TotalEarning";
import { PopularKeyDto } from "../../../models/dto/PopularKeyDto";
import { EarningByKeySubCategoryDto } from "../../../models/dto/EarningByKeySubCategoryDto";
//@ts-ignore
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Color, Label } from "ng2-charts";
import { DialogUtil } from "../../../util/dialog-util";
import { KeyOverviewDialogComponent } from "../key/key-overview-dialog/key-overview-dialog.component";
import { DialogOptions } from "../../../util/dialog-options";
import { MatDialog } from "@angular/material/dialog";
import { MonthAnalyticsDto } from "../../../models/dto/MonthAnalyticsDto";

@Component({
  selector: "app-analytics",
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.sass"]
})
export class AnalyticsComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = "bar";
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartColors: Color[] = [
    {
      borderColor: "black",
      backgroundColor: "rgb(128,9,225)",
    },
  ];

  public barChartData: ChartDataSets[] = [
    { data: [], label: "Zarada" },
    { data: [], label: "Količina" },
  ];

  public lineChartData: ChartDataSets[] = [
    { data: [] },
  ];

  public lineChartLabels: Label[] = [];

  public lineChartColors: Color[] = [
    {
      borderColor: "white",
      backgroundColor: "rgb(0,196,255)",
    },
  ];

  allTimeEarned: TotalEarning;
  workServiceEarning: TotalEarning;
  listOfEarningsByMonth: MonthAnalyticsDto[];
  listOfTopFivePopularKeys: PopularKeyDto[] = [];
  listOfEarningsByKeySubCategory: EarningByKeySubCategoryDto[] = [];

  constructor(private analyticsService: AnalyticsService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllTimeEarned();
    this.getTopFivePopularKeys();
    this.getEarningByKeySubCategory();
    this.getWorkServiceEarning();
    this.getEarningsByMonth();
  }

  getAllTimeEarned() {
    this.analyticsService.getAllTimeEarned().subscribe((resp) => {
      this.allTimeEarned = resp;
    });
  }

  getWorkServiceEarning() {
    this.analyticsService.getWorkServiceEarning().subscribe((resp) => {
      this.workServiceEarning = resp;
    });
  }


  getEarningByKeySubCategory() {
    this.analyticsService.getEarningByKeySubCategory().subscribe((resp) => {
      this.barChartLabels = resp.map((item) => item.name);
      this.barChartData[0].data = resp.map((item) => item.sum);
      this.barChartData[1].data = resp.map((item) => item.count);
    });
  }

  getTopFivePopularKeys() {
    this.analyticsService.getTopFivePopularKeys().subscribe((resp) => {
      this.listOfTopFivePopularKeys = resp;
    });
  }

  getEarningsByMonth() {
    this.analyticsService.getEarningsByMonth().subscribe((resp) => {
      this.lineChartLabels = resp.map((item) => item.month);
      this.lineChartData[0].data = resp.map((item) => item.total);
      this.listOfEarningsByMonth = resp
    });
  }

  openKeyOverviewDialog(id: number): void {
    DialogUtil.openDialog(KeyOverviewDialogComponent, DialogOptions.setDialogConfig({
      position: { top: "6%" },
      width: "30%",
      data: { id },
    }), this.dialog);
  }

}
