import {NgModule} from '@angular/core';
import {CircleLetters} from './pipes/string/circle-letters';
import {TimePipe} from './pipes/time/time';
import {SanitizePipe} from './pipes/helpers/sanitizePipe';
import {CutString} from './pipes/string/cut-string';
import {CapitalizeFirst} from './pipes/string/capitalizefirst';
import {SplitTags} from './pipes/dom/split-tags';

@NgModule({
    declarations: [
        SanitizePipe,
        CircleLetters,
        CutString,
        CapitalizeFirst,
        TimePipe,
        SplitTags,

    ],
    exports: [
        SanitizePipe,
        CircleLetters,
        CutString,
        CapitalizeFirst,
        TimePipe,
        SplitTags,

    ],
})
export class ApplicationPipesModule {
}
