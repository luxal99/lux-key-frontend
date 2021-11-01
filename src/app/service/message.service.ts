import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Message, RestRoutes } from '../constant/const';

@Injectable({
  providedIn: 'root',
})
export class MessageService extends GenericService<Message> {
  route=RestRoutes.MESSAGE
}
