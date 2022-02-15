import { Component, Input, OnInit } from '@angular/core';
import { Field } from '../../../models/Field';
import { FieldConfig } from '../../../models/FieldConfig';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-select-group',
  templateUrl: './form-select-group.component.html',
  styleUrls: ['./form-select-group.component.sass'],
})
export class FormSelectGroupComponent implements OnInit, Field {
  @Input() config!: FieldConfig;
  @Input() group!: FormGroup;
  @Input() itemList: any[] = [];
  @Input() groupList: any[] = [];
  @Input() model: any;

  constructor() {}

  ngOnInit(): void {}

  compareObjects(o1: any, o2: any): boolean {
    if (o2 !== null && o2 !== undefined) {
      return o1.id === o2.id;
    } else {
      return false;
    }
  }
}
