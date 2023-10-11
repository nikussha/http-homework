import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateCalc',
})
export class DateCalcPipe implements PipeTransform {
  transform(value: any) {
    if (!value) {
      return;
    }
    const date = new Date().getFullYear();
    const year = value.split(' ').pop();
    return Number(date) - Number(year);
  }
}
