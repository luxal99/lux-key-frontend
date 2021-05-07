import {Component, OnInit} from '@angular/core';
import {DefaultComponent} from '../../util/default-component';
import {CarBrand} from '../../models/carBrand';
import {CarBrandService} from '../../service/car-brand.service';
import {SnackBarUtil} from '../../util/snackbar-util';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }


}
