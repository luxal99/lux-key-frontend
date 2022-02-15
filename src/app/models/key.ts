import { KeySubCategory } from "./keySubCategory";
import { KeyPrice } from "./keyPrice";
import { CarBrand } from "./carBrand";
import { KeyBrand } from "./KeyBrand";
import { KeyImage } from "./KeyImage";


export interface Key {
  id: number;
  amount?: number;
  code?: string;
  purchasePrice?: number;
  createdDate?: string;
  lastModifiedDate?: string;
  carBrands?: CarBrand[];
  idCurrentPrice?: KeyPrice;
  idKeyBrand?: KeyBrand;
  idKeySubCategory?: KeySubCategory;
  keyPrices?: KeyPrice[];
  idKeyImage?: KeyImage;
}

