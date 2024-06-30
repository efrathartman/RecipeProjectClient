import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'preparationTime',
  standalone: true
})
// export class PreparationTimePipe implements PipeTransform {

  // transform(value: number |undefined) {
  //   if(value === undefined)
  //     return;
  //    else{
  //   if (value < 0) {
  //     return 'Invalid time';
  //   }

  //   const hours = Math.floor(value / 60);
  //   const minutes = value % 60;

  //   let result = '';
   
  
  //   return `זמן הכנה: ${hours} שעות ו-${minutes} דקות`;
  
  //   return result.trim();
  // }
  // }}
  export class PreparationTimePipe implements PipeTransform {

    transform(value: number|undefined): string {
         if (!value) return '';
        const hours = Math.floor(value / 60);
        const minutes = value % 60;
        console.log(` ${hours} שעות ו- ${minutes} דקות`);
         if(hours===0){
          return `זמן הכנה: ${minutes} דקות`;
         }
         if(minutes===0)
          {
            if(hours===1){
              return `זמן הכנה: שעה `
            }
            return `זמן הכנה: ${hours} שעות`
          }
          if(hours===1){
            return `זמן הכנה: שעה ו ${minutes} דקות`
          }
          
        return `זמן הכנה: ${hours} שעות ו-${minutes} דקות`;
    
    }
  
  }



