import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Report } from '../models/Report';
import { RestRoutes } from '../constant/const';
import { Observable } from 'rxjs';

type ReportType = 'BUILT_IN' | 'IN_STOCK';
@Injectable({
  providedIn: 'root',
})
export class ReportService extends GenericService<Report> {
  route = RestRoutes.REPORT;
}
