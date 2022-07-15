import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myfilter',
    pure: false
})
export class MyFilterPipe implements PipeTransform {
    /** 
     * Кастомная функция фильтра
    */
    transform(items: any[], filter: string): any {
        if (!items || !filter) {
            return items;
        }
        
        return items.filter(item => item.gender == filter);
    }
}