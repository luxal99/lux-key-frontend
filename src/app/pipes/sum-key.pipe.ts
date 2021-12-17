import { Pipe, PipeTransform } from "@angular/core";
import { Key } from "../models/key";

@Pipe({
  name: "sumKey",
})
export class SumKeyPipe implements PipeTransform {

  transform(listOfKey: Key[]): number {
    let total = 0;
    listOfKey.filter((item) => total += item.idCurrentPrice.price);
    return total;
  }

}
