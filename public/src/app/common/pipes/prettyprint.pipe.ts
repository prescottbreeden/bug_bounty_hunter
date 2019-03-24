import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyprint'
})
export class PrettyPrintPipe implements PipeTransform {

  transform(val: any, args?: any): any {
    return JSON.stringify(val, null, 2)
      .replace(' ', '&nbsp') 
      .replace('\n', '<br/>')
    ;
  }

}
