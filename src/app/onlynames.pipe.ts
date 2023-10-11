import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'namesPipe',
})
export class namesPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    if (!value) {
      return;
    }
    let names = value.split(' ').filter((_: string, i: number) => i % 2 === 0);
    return names;
  }
}
