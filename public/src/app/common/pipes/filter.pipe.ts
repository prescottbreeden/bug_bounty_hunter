import { Pipe, PipeTransform } from '@angular/core';
import { BugModel } from 'src/app/common/models/Bug';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: BugModel[], searchText?: string): any[] {
    if(!items) return [];
    if(!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter( it => {
      return it.error.toLowerCase().includes(searchText);
    });
  }

}
