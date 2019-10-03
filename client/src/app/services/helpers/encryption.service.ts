export class Encryption {

    /*
        DON'T TOUCH THIS CLASS !!!
    */

    private static __cr: any;

    protected static storage: any;

    constructor()
    {
        const __s: any = window as any;

        Encryption.storage = __s.localStorage;
        Encryption.__cr = __s.Dvour;
    }

    public static enCrypt( __d: any ): any
    {
        return Encryption.__cr.AES.encrypt(JSON.stringify(__d), Encryption.__);
    }

    protected static deCrypt( __d: any ): any
    {
        const __by: any = Encryption.__cr.AES.decrypt(__d.toString(), Encryption.__);
        return JSON.parse(__by.toString(Encryption.__cr.enc.Utf8));
    }
    public deCryptUrl( __d: any ): any
    {
        const __by: any = Encryption.__cr.AES.decrypt(__d.toString(), Encryption.__);
        return JSON.parse(__by.toString(Encryption.__cr.enc.Utf8));
    }

    protected static keyEnCrypt( __k: string ): any
    {
        return Encryption.__cr.HmacSHA256(__k, Encryption.__);
    }

    private static get __(): string
    {
        const __es: string = String.fromCharCode.apply(null, Encryption._____);
        return decodeURIComponent((window as any).escape(atob(__es)));
    }

    private static get _____(): Array<number>
    {
        const __re: Array<number> = [] as Array<number>,
            ___1: Array<string> = Encryption.___.split('37'),
            ___2: Array<string> = Encryption.____.split('37');
        let __rc: number = 0;
        ___1.forEach( ( __v: string ): void => {

            if ( __v === '95' )
            {
                __re.push(+___2[__rc]);
                __rc++;
            }
            else
            {
                __re.push(+__v);
            }
        });

        return __re;
    }

    private static get ___(): string
    {
        const ___: string = '37',
            __: string = '95';

        return '78' + ___ + '87' + ___ + '81' + ___ + __ + ___ + '99' + ___ + '69' + ___
            + '52' + ___ + __ + ___ + '75' + ___ + '50' + ___ + __ + ___ + '84' + ___
            + '84' + ___ + '50' + ___ + '74' + ___ + '75' + ___ + '90' + ___ + '86' + ___ +
            '74' + ___ + __ + ___ + '97' + ___ + '86' + ___ + __ + ___ + '53' + ___ + '84'
            + ___ + '49' + ___ + '78' + ___ + __ + ___ + '86' + ___ + __ + ___ + __ + ___
            + '77' + ___ + '75' + ___ + '50' + ___ + __ + ___ + __ + ___ + '85' + ___ + __
            + ___ + '65' + ___ + '52' + ___ + '86' + ___ + '50' + ___ + __ + ___ + __ + ___
            + '82' + ___ + '50' + ___ + '69' + ___ + __ + ___ + __ + ___ + '84' + ___ + '70'
            + ___ + '81' + ___ + '99' + ___ + '85' + ___ + __ + ___ + __ + ___ + '86' + ___
            + '84' + ___ + '48' + ___ + '61';
    }

    private static get ____(): string
    {
        const ___: string = '37';

        return '120' + ___ + '121' + ___ + '104' + ___ + '118' + ___ + '112' + ___ + '111' + ___
            + '107' + ___ + '104' + ___ + '107' + ___ + '119' + ___ + '122' + ___ + '100' + ___
            + '121' + ___ + '118' + ___ + '101' + ___ + '115' + ___ + '121';
    }
}

// @ts-ignore
window.test = Encryption;