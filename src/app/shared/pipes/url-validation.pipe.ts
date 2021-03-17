import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlValidation'
})
export class UrlValidationPipe implements PipeTransform {

  public transform(value: unknown): boolean | null {
    if (value === undefined || value === null || typeof value !== 'string') {
      return null;
    }
    return value.split('://')?.length === 2;
  }
}
