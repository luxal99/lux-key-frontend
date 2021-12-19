import { Injectable } from "@angular/core";
import { GenericService } from "./generic.service";
import { Key } from "../models/key";
import { RestRoutes } from "../constant/const";
import { Observable } from "rxjs";
import { HttpParams } from "@angular/common/http";
import { KeySubCategory } from "../models/keySubCategory";

@Injectable({
  providedIn: "root",
})
export class KeyService extends GenericService<Key> {
  route = RestRoutes.KEY;

  findCriticalAmountKeys(): Observable<Key[]> {
    return this.http.get<Key[]>(this.route + "/critical-amount");
  }

  searchKey(search: string): Observable<Key[]> {
    const params = new HttpParams().set("search", search);
    return this.http.get<Key[]>(this.route + "/search", { params });
  }

  findKeyByKeySubCategory(idKeySubCategory: number): Observable<Key[]> {
    return this.http.get<Key[]>(this.route + "/by-key-sub-category", {
      params: { idKeySubCategory },
      responseType: "json",
    });
  }

  generateReport(): Observable<any> {
    return this.http.post(this.route + "/generate", null, { responseType: "text" });
  }
}
