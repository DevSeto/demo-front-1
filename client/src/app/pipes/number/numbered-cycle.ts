import {PipeTransform, Pipe} from '@angular/core';

@Pipe({name: 'numberedCycle'})
export class NumberedCycle implements PipeTransform {

    transform( count: number ): Array<string|number> {

        let i: number = 0;
        const returnedData: Array<string|number> = [];
        for ( i; i <= count; i++ )
        {
            returnedData.push((count / 2) - i);
        }
        return returnedData.reverse();
    }
}
