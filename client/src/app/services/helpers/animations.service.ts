import {
    trigger,
    style,
    animate,
    transition,
    AnimationTriggerMetadata,
} from '@angular/animations';

export const DROP_DOWN: AnimationTriggerMetadata = trigger('dropDown', [
        transition(':enter', [
            style({
                opacity: 0,
                height: 0,
            }),
            animate('500ms ease-in'),
        ]),
        transition(':leave', [
            style({
                transform: 'translateX(0)',
                opacity: 1,
                height: 'auto',
            }),
            animate('0ms ease-out'),
        ]),
    ],
);