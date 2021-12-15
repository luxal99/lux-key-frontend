import { Injectable } from "@angular/core";
import { MatSpinner } from "@angular/material/progress-spinner";
import { SpinnerOptions } from "../constant/const";

@Injectable({
  providedIn: "root"
})
export class SpinnerService {
  show(spinner: MatSpinner): void {
    spinner._elementRef.nativeElement.style.display = SpinnerOptions.BLOCK;
  }

  hide(spinner: MatSpinner): void {
    spinner._elementRef.nativeElement.style.display = SpinnerOptions.NONE;
  }
}
