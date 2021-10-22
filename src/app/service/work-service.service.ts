import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { WorkService } from '../models/workService';
import { RestRoutes } from '../constant/const';

@Injectable({
  providedIn: 'root'
})
export class WorkServiceService extends GenericService<WorkService>{
  route = RestRoutes.WORK_SERVICE;
}
