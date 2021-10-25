export const SELECTED_CLASS_NAME = 'selected';
export const DEFAULT_BTN_CLASS_NAME = 'default-btn';

export const CLIENT_ID_PREFIX = 'client-';
export const KEY_ID_PREFIX = 'key-';

export class FormControlNames {
  static USERNAME_NAME_FORM_CONTROL = 'username';
  static PASSWORD_NAME_FORM_CONTROL = 'password';
  static NAME_FORM_CONTROL = 'name';
  static ID_CAR_BRAND_FORM_CONTROL = 'idCarBrand';
  static ID_WORK_SERVICE = 'idWorkService';
  static CAR_BRANDS_FORM_CONTROL = 'carBrands';
  static ID_KEY_CATEGORY_FORM_CONTROL = 'idKeyCategory';
  static FIRST_NAME_FORM_CONTROL = 'firstName';
  static LAST_NAME_FORM_CONTROL = 'lastName';
  static TELEPHONE_FORM_CONTROL = 'telephone';
  static PRICE_FORM_CONTROL = 'price';
  static CODE_FORM_CONTROL = 'code';
  static AMOUNT_FORM_CONTROL = 'amount';
  static ID_CURRENT_PRICE_FORM_CONTROL = 'idCurrentPrice';
  static ID_CAR_MODEL_FORM_CONTROL = 'idCarModel';
  static ID_KEY_SUB_CATEGORY_FORM_CONTROL = 'idKeySubCategory';
  static SEARCH_FORM_CONTROL = 'search';
  static CAR_BRAND_FORM_CONTROL = 'carBrand';
  static GROSS_FORM_CONTROL = 'gross';
  static DATE_FORM_CONTROL = 'date';
  static PURCHASE_PRICE_FORM_CONTROL = 'purchasePrice';
  static START_DATE_FORM_CONTROL = 'startDate';
  static END_DATE_FORM_CONTROL = 'endDate';
  static ID_KEY_BRAND_FORM_CONTROL = 'idKeyBrand';
  static NOTES = 'notes';
  static SERVICE_TYPE = 'serviceType';
}

export class InputTypes {
  static TEXT = 'text';
  static INPUT = 'input';
  static NUMBER = 'number';
  static PASSWORD = 'password';
  static SELECT = 'select';
  static AUTOCOMPLETE = 'autocomplete';
  static DATE = 'date';
}

export class RestRoutes {
  static API = 'http://localhost:8080/';
  static USER = '/user';
  static CAR_BRAND = '/car-brand';
  static JWT = '/jwt';
  static CLIENT = '/client';
  static CAR_MODEL = 'car-model';
  static KEY_CATEGORY = 'key-category';
  static KEY = 'key';
  static KEY_PRICE = 'key-price';
  static KEY_SUB_CATEGORY = 'key-sub-category';
  static SERVICE = 'service';
  static SERVICE_KEY = 'service-key';
  static KEY_BRAND = 'key-brand';
  static REPORT = 'report';
  static WORK_SERVICE = 'work-service';
}

export class SpinnerOptions {
  static BLOCK = 'block';
  static NONE = 'none';
}

export const TOKEN_NAME = 'Authorization';

export class PageRoutes {
  static LOGIN = '/';
  static ADMIN = '/admin';
}

export class Message {
  static SUCCESS = 'Uspešno';
  static ERR = 'Dogodila se greška';
}
