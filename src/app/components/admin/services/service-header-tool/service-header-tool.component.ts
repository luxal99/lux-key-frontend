import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-service-header-tool",
  templateUrl: "./service-header-tool.component.html",
  styleUrls: ["./service-header-tool.component.sass"]
})
export class ServiceHeaderToolComponent implements OnInit {

  @Output() sortByDateASC = new EventEmitter();
  @Output() sortByDateDESC = new EventEmitter();
  @Output() sortByPriceASC = new EventEmitter();
  @Output() sortByPriceDESC = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

}
