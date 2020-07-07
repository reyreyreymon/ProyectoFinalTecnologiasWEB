import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'letras'
})
export class LetrasPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case 1: return 'uno';
      case 2: return 'dos';
      case 3: return 'tres';
      case 4: return 'cuatro';
      case 5: return 'cinco';
      case 6: return 'seis';
      case 7: return 'siete';
      case 8: return 'ocho';
      case 9: return 'nueve';
      case 10: return 'diez';
      case 11: return 'once';
      case 12: return 'doce';
      case 13: return 'trece';
      case 14: return 'catorce';
      case 15: return 'quince';
      case 16: return 'dieciseis';
      case 17: return 'diecisiete';
      case 18: return 'dieciocho';
      case 19: return 'diecinueve';
      case 20: return 'veinte';
    }
    return null;
  }

}
