import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { RestRoutes, TOKEN_NAME } from "../constant/const";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class JwtService {

  constructor(protected http: HttpClient) {
  }

  verify(): Observable<any> {
    return this.http.get(RestRoutes.JWT, {
      responseType: "json",
      headers: { Authorization: sessionStorage.getItem(TOKEN_NAME) }
    });
  }
}
