import { Client } from '../../client';

export interface Message {
  id?: number;
  idClient?: Client;
  message?: string;
}
