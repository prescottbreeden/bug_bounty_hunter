import { Pipe, PipeTransform } from '@angular/core';
import { Bug } from 'src/app/common/models/bug/Bug';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: Bug[], searchText?: string): any[] {
    if(!items) return [];
    if(!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter( it => {
      return it.error.toLowerCase().includes(searchText);
    });
  }

}
