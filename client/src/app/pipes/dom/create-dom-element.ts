import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'createDom' })
export class CreateDomElement implements PipeTransform {

    public transform( domObject: any ): any
    {
        return domObject.innerHTML;
    }
}
