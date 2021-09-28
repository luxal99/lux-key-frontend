import { Pipe, PipeTransform } from '@angular/core';
import { CarBrand } from '../models/carBrand';

@Pipe({
  name: 'bindCarBrands',
})
export class BindCarBrandsPipe implements PipeTransform {

  transform(carBrands: CarBrand[]): string {
    let carBrandStr = '';

    carBrands.filter((item) => {
      carBrandStr += item.name + ' ';
    });
    return carBrandStr;
  }

}
