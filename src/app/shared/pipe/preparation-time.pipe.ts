import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'preparationTime',
  standalone: true
})
export class PreparationTimePipe implements PipeTransform {

  transform(value: number |undefined) {
    if(value === undefined)
      return;
     else{
    if (value < 0) {
      return 'Invalid time';
    }

    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    let result = '';
   
  
    return `זמן הכנה: ${hours} שעות ו-${minutes} דקות`;
  
    return result.trim();
  }
  }}


