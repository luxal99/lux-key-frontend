import { KeyCategory } from "./keyCategory";
import { Key } from "./key";
import { ServiceTypeEnum } from "../ServiceTypeEnum";


export interface KeySubCategory {
  id: number;
  name: string;
  createdDate: string;
  lastModifiedDate: string;
  idKeyCategory: KeyCategory;
  serviceType: ServiceTypeEnum;
  keys: Key[];
}

