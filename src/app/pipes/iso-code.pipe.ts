import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'flagIsoCode',
})
export class FlagIsoCode implements PipeTransform {
  transform(isoCode: string): string {
    return `https://flagcdn.com/w40/${isoCode.slice(0, 2).toLowerCase()}.png`;
  }
}
