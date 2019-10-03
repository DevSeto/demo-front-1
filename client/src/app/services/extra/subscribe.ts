import {EventEmitter} from '@angular/core';

export let Subscrabably: any = {};

export function Subscribe(name: string | symbol, root: boolean = !1): any {
    return (target: any, key: string | symbol): void => {
        let value: any = target[key];

        if (!Subscrabably[name])
            Subscrabably[name] = new EventEmitter();

        const getter: any = (): any => value;
        const setter: any = async (val: any) => value = val;

        Reflect.defineProperty(target, key, {
            get: getter,
            set: setter,
        });

        Subscrabably[name].subscribe((data: any): void => {
            target[key] = data;
        });
    };
}