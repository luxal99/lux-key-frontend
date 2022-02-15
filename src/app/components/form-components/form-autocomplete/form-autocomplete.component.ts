import { Component, Input, OnInit, Output } from '@angular/core';
import { Field } from '../../../models/Field';
import { FieldConfig } from '../../../models/FieldConfig';
import { FormGroup } from '@angular/forms';
import { CarBrand } from '../../../models/carBrand';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-autocomplete',
  templateUrl: './form-autocomplete.component.html',
  styleUrls: ['./form-autocomplete.component.sass'],
})
export class FormAutocompleteComponent implements OnInit, Field {
  @Input() config!: FieldConfig;
  @Input() group!: FormGroup;
  searchText = '';
  @Output() onOptionClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  displayFn(carBrand: CarBrand): CarBrand | string {
    return carBrand ? carBrand.name : '';
  }
}
