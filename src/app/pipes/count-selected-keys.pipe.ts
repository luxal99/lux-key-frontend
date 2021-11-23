import { Pipe, PipeTransform } from "@angular/core";
import { Key } from "../models/key";

@Pipe({
  name: "countSelectedKeys"
})
export class CountSelectedKeysPipe implements PipeTransform {

  transform(listOfKeys: Key[], id: number): number {
    let count = 0;
    listOfKeys.forEach((key) => {
      if (key.id === id) {
        count++;
      }
    });
    return count;
  }

}
