import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { RestRoutes, TOKEN_NAME } from "../constant/const";

@Injectable({
  providedIn: "root"
})
export class GenericService<T> {

  protected route = "";

  constructor(protected http: HttpClient) {
  }

  save(entity: T): Observable<T> {
    return this.http.post<T>(`${this.route}`, entity, {
      responseType: "json"
    });
  }

  findById(id: number): Observable<T> {
    return this.http.get<T>(`${this.route}/` + id, {
      responseType: "json"
    });
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.route}`, {
      responseType: "json"
    });
  }

  update(entity: T): Observable<any> {
    return this.http.put(`${this.route}`, entity, {
      responseType: "text"
    });
  }


  delete(id: number): Observable<any> {
    return this.http.delete(`${this.route}/${id}`, {
      responseType: "text"
    });
  }


}
