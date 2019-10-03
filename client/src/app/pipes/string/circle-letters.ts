import {PipeTransform, Pipe} from '@angular/core';

@Pipe({
    name: 'circleLetters',
})

export class CircleLetters implements PipeTransform {

    transform( text: string ): string
    {
        let returnedString: string = '';
        const splitedString: Array<string> = text.split(' ');
        if ( splitedString[0] )
            returnedString = splitedString[0][0];

        if ( splitedString[1] )
            returnedString += splitedString[1][0];

        return returnedString.toUpperCase();
    }
}
