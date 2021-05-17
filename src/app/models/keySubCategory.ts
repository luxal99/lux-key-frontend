import {KeyCategory} from './keyCategory';
import {Key} from './key';


export interface KeySubCategory {
  id: number;
  name: string;
  createdDate: string;
  lastModifiedDate: string;
  idKeyCategory: KeyCategory;
  keys: Key[];
}

