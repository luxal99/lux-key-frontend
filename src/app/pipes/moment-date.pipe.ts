import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
  name: "momentDate"
})
export class MomentDatePipe implements PipeTransform {

  transform(date: string): string {
    if (!date) {
      return "";
    }
    return moment(date).format("DD-MM-YYYY");
  }

}
