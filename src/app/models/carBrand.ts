
import {CarModel} from './carModel';
export interface CarBrand {
  id: number;
  name: string;
  createdDate: string;
  lastModifiedDate: string;
  carModels: CarModel;
}

