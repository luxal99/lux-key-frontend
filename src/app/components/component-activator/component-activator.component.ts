import { Component, Input, OnInit, Output } from "@angular/core";
import { EventEmitter } from "@angular/core";

@Component({
  selector: "app-component-activator",
  templateUrl: "./component-activator.component.html",
  styleUrls: ["./component-activator.component.sass"]
})
export class ComponentActivatorComponent implements OnInit {

  @Output() load = new EventEmitter();

  @Input() icon = "";
  @Input() title = "";

  constructor() {
  }

  ngOnInit(): void {
  }

  loadComponent(event: any) {
    this.changeColor(event);
    this.load.emit(true);
  }

  changeColor(e: any): void {
    const element = document.querySelectorAll(".active");
    [].forEach.call(element, (el: any) => {
      el.classList.remove("active");
      el.classList.add("inactive");
    });
    e.target.className = "active";
  }
}
