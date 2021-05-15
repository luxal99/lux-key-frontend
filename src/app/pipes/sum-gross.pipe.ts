import {Pipe, PipeTransform} from '@angular/core';
import {Service} from '../models/service';

@Pipe({
  name: 'sumGross'
})
export class SumGrossPipe implements PipeTransform {

  transform(listOfServices: Service[]): number {
    let total = 0;
    listOfServices.filter((item) => total += item.gross);
    return total;
  }

}
