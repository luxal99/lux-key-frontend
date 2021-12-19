import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Field } from "../../../models/Field";
import { FieldConfig } from "../../../models/FieldConfig";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-form-date",
  templateUrl: "./form-date.component.html",
  styleUrls: ["./form-date.component.sass"]
})
export class FormDateComponent implements OnInit, Field {


  @Input() config!: FieldConfig;
  @Input() group!: FormGroup;
  @Input() icon = "format_align_right";
  @Input() isRequired!: boolean;
  @Input() appearance = "outline";
  // tslint:disable-next-line:no-output-native
  @Output() change = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

}
