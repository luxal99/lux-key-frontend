import {Pipe, PipeTransform} from '@angular/core';
import {Key} from '../models/key';

@Pipe({
  name: 'key'
})
export class KeyPipe implements PipeTransform {

  transform(listOfKeys: Key[], searchText: string): unknown {
    if (!listOfKeys) {
      return [];
    }

    if (!searchText) {
      return listOfKeys;
    }

    return listOfKeys.filter((key) => key.code.toLowerCase().startsWith(searchText.toLowerCase()) ||
      key.name.toLowerCase().startsWith(searchText.toLowerCase()));
  }

}
