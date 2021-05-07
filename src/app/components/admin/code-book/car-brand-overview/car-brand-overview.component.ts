import {Component, OnInit} from '@angular/core';
import {DefaultComponent} from '../../../../util/default-component';
import {CarBrand} from '../../../../models/carBrand';
import {CarBrandService} from '../../../../service/car-brand.service';
import * as moment from 'moment';

@Component({
  selector: 'app-car-brand-overview',
  templateUrl: './car-brand-overview.component.html',
  styleUrls: ['./car-brand-overview.component.sass']
})
export class CarBrandOverviewComponent extends DefaultComponent<CarBrand> implements OnInit {

  constructor(private carBrandService: CarBrandService) {
    super(carBrandService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }


}
