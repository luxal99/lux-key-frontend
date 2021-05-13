import {Component, Input, OnInit} from '@angular/core';
import {Service} from '../../../../models/service';

@Component({
  selector: 'app-service-table-binding',
  templateUrl: './service-table-binding.component.html',
  styleUrls: ['./service-table-binding.component.sass']
})
export class ServiceTableBindingComponent implements OnInit {

  @Input() list: Service[] = [];
  displayedColumns = ['date', 'client', 'gross', 'option'];

  constructor() {
  }

  ngOnInit(): void {
  }

}
