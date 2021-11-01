import { GenericService } from '../service/generic.service';
import { FieldConfig } from './FieldConfig';

export interface FormBuilderConfig {
  service: GenericService<any>;
  formFields: FieldConfig[];
  formValues?: any;
  headerText?: any;
  data?: any;
}
