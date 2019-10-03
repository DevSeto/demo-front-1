import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'splitTags' })
export class SplitTags implements PipeTransform {

    public transform( text: string ): string
    {
        return text.replace(/(<([^>]+)>)/ig, '');
    }
}
