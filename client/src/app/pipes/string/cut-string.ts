import {PipeTransform, Pipe} from '@angular/core';

@Pipe({
    name: 'cutString',
})

export class CutString implements PipeTransform {

    transform( text: string, cuttedString: string ): string
    {
        return text.replace(cuttedString, '');
    }
}
