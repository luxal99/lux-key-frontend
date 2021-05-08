export class FormControlNames {
  static USERNAME_NAME_FORM_CONTROL = 'username';
  static PASSWORD_NAME_FORM_CONTROL = 'password';
  static NAME_FORM_CONTROL = 'name';
  static ID_CAR_BRAND_FORM_CONTROL = 'idCarBrand';
  static ID_KEY_CATEGORY_FORM_CONTROL = 'idKeyCategory';
}

export class InputTypes {
  static TEXT = 'text';
  static INPUT = 'input';
  static PASSWORD = 'password';
  static SELECT = 'select';
  static AUTOCOMPLETE = 'autocomplete';
}

export class RestRoutes {
  static API = 'http://localhost:8080/lux/';
  static USER = '/user';
  static CAR_BRAND = '/car-brand';
  static JWT = '/jwt';
  static CAR_MODEL = 'car-model';
  static KEY_CATEGORY = 'key-category';
  static KEY_SUB_CATEGORY = 'key-sub-category';
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
