import { Pipe, PipeTransform } from "@angular/core";
import { CarBrand } from "../models/carBrand";

@Pipe({
  name: "carBrand"
})
export class CarBrandPipe implements PipeTransform {

  transform(listOfCarBrands: CarBrand[], searchText: string): CarBrand[] {
    if (!searchText) {
      return listOfCarBrands;
    }

    if (!listOfCarBrands) {
      return [];
    }

    return listOfCarBrands.filter((carBrand) => carBrand.name.toLowerCase().startsWith(searchText.toLowerCase()));
  }

}
