import {Component, OnInit} from '@angular/core';
import {CarModelService} from 'src/app/service/car-model.service';
import {DefaultComponent} from '../../../../util/default-component';
import {CarModel} from '../../../../models/carModel';

@Component({
  selector: 'app-car-model-overview',
  templateUrl: './car-model-overview.component.html',
  styleUrls: ['./car-model-overview.component.sass']
})
export class CarModelOverviewComponent extends DefaultComponent<CarModel> implements OnInit {

  constructor(private carModelService: CarModelService) {
    super(carModelService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
