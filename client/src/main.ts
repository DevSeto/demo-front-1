import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (process.env.ENV === 'production')
    // enableProdMode();

(window as any).production_mode = !!0;

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

platformBrowserDynamic().bootstrapModule(AppModule);
