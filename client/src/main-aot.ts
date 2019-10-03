import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from './app/app.module.ngfactory';
import { enableProdMode } from '@angular/core';

const consoleSettings: any = {
    disableText: 'Production mode',
    infoStop: {
        text: '%cPlease stop!',
        style: 'color: #57b9e8; font-size: xx-large; font-family: sans-serif; font-weight: 900',
    },
    infoDescription: {
        text: '%cThis is a browser feature intended for developers.',
        style: 'color: black; font-size: large; font-family: sans-serif',
    },
};

const customiseConsole = (): void => {
    // console.log = () => consoleSettings.disableText;
    // console.clear = () => consoleSettings.disableText;
    // console.info(consoleSettings.infoStop.text, consoleSettings.infoStop.style);
    // console.info(consoleSettings.infoDescription.text, consoleSettings.infoDescription.style);
};

(window as any).production_mode = !!1;

/*
 DON'T TOUCH !!!
 */
((): void => {
    const _0x782f: Array<any> = [
        '\x63\x6C\x6F\x75\x64',
        '\x73\x68\x6F\x77\x65\x64',
        '\x64\x65\x66\x69\x6E\x65\x50\x72\x6F\x70\x65\x72\x74\x69\x65\x73',
    ];

    (window as any)[_0x782f[0]] = {};
    (window as any)[_0x782f[1]] = {};

    Object[_0x782f[2]]((window as any)[_0x782f[1]], {
        effect: {
            get(){
                return (window as any)[_0x782f[0]];
            },
            set( _0x5a6bx1: string ){
                if ((window as any)[_0x782f[0]][_0x5a6bx1])
                    delete (window as any)[_0x782f[0]][_0x5a6bx1];
                else
                    (window as any)[_0x782f[0]][_0x5a6bx1] =  !!1;
            },
        },
    });
})();

customiseConsole();
// enableProdMode();
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
