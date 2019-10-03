import {PipeTransform, Pipe} from '@angular/core';
import {isString} from '../helpers/helpers';

@Pipe({
    name: 'randomColorsPipe',
})

export class RandomColorsPipe implements PipeTransform {

    transform( date_str: any ): any {
        const chooseColor: Array<string> = [
            '#f26c4f',
            '#fbaf5d',
            '#acd373',
            '#3cb878',
            '#1cbbb4',
            '#00bff3',
            '#448ccb',
            '#8560a8',
            '#f06eaa',
        ];
        return chooseColor[Math.floor(Math.random() * chooseColor.length)];
    }
}
