import { CarModel } from "./carModel";
import { Key } from "./key";

export interface CarBrand {
  id: number;
  name: string;
  createdDate: string;
  lastModifiedDate: string;
  carModels: CarModel;
  keys: Key[];
}

