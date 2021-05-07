import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-element-binding',
  templateUrl: './element-binding.component.html',
  styleUrls: ['./element-binding.component.sass']
})
export class ElementBindingComponent implements OnInit {

  @Input() list: any[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
