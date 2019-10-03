export class _ {

    constructor() {
    }

    public static e = (error: any = ''): void => {
        console.error('LOGGER', error);
    }

    public static l = (log: any = ''): void => {
        console.warn('LOGGER', log);
    }

    public static _: string = String();

    public static if_exist: any = (data: any, value: any): boolean => data.some(
        (element: any): boolean => element === value,
    )

    public static gaussRound(num: number, decimalPlaces: number): number {
        const d: number = decimalPlaces || 0,
            m: number = Math.pow(10, d),
            n: number = +(d ? num * m : num).toFixed(8),
            i: number = Math.floor(n), f = n - i,
            e: number = 1e-8,
            r: number = (f > 0.5 - e && f < 0.5 + e) ?
                ((i % 2 === 0) ? i : i + 1) : Math.round(n);

        return d ? r / m : r;
    }

    public static empty(data: any): boolean {
        let type: string = typeof data,
            returnedType: boolean;

        if (type === 'function') {
            data = data();
            type = typeof data;
        }
        if (data === null){
            return false;
        }

        switch (type) {
            case 'object':
            case 'string':
                returnedType = !!Object.keys(data).length;
                break;
            case 'number':
            case 'boolean':
                returnedType = data;
                break;
            default:
                returnedType = !!0;
        }

        return returnedType;
    }

    public static hierarchicalObjectToArray(data: any, callbackFunction: any, memo: any): Array<any> {
        let returnedData: any;

        const iterator = (value: any, path: any) => {
            const type: string = Object.prototype.toString.call(value);
            memo = callbackFunction(memo, value, path);

            if (type === '[object Array]') {
                for (let i = 0, len = value.length; i < len; i++)
                    iterator(value[i], path.concat(i));
            } else if (type === '[object Object]') {
                for (const key in value) {
                    if (value.hasOwnProperty(key) && path.concat.hasOwnProperty(key))
                        iterator(value[key], path.concat(key));
                }
            }

            return memo;
        };

        returnedData = iterator(data, []);

        Object.keys(returnedData).forEach((key: any) => {
            if (typeof returnedData[key] === 'object') {
                delete returnedData[key];
            }
        });

        return returnedData;
    }
    /**
     * Get all DOM element up the tree that contain a class, ID, or data attribute
     * @param  {Node} elem The base element
     * @param  {String} selector The class, id, data attribute, or tag to look for
     * @return {Array} Null if no match
     */
    public static  getParents: any = (elem: any, selector: any): any => {
// Variables
        var firstChar = selector.charAt(0);
        var supports = 'classList' in document.documentElement;
        var attribute, value;

        // If selector is a data attribute, split attribute from value
        if ( firstChar === '[' ) {
            selector = selector.substr( 1, selector.length - 2 );
            attribute = selector.split( '=' );

            if ( attribute.length > 1 ) {
                value = true;
                attribute[1] = attribute[1].replace( /"/g, '' ).replace( /'/g, '' );
            }
        }

        // Get closest match
        for ( ; elem && elem !== document && elem.nodeType === 1; elem = elem.parentNode ) {

            // If selector is a class
            if ( firstChar === '.' ) {
                if ( supports ) {
                    if ( elem.classList.contains( selector.substr(1) ) ) {
                        return elem;
                    }
                } else {
                    if ( new RegExp('(^|\\s)' + selector.substr(1) + '(\\s|$)').test( elem.className ) ) {
                        return elem;
                    }
                }
            }

            // If selector is an ID
            if ( firstChar === '#' ) {
                if ( elem.id === selector.substr(1) ) {
                    return elem;
                }
            }

            // If selector is a data attribute
            if ( firstChar === '[' ) {
                if ( elem.hasAttribute( attribute[0] ) ) {
                    if ( value ) {
                        if ( elem.getAttribute( attribute[0] ) === attribute[1] ) {
                            return elem;
                        }
                    } else {
                        return elem;
                    }
                }
            }

            // If selector is a tag
            if ( elem.tagName.toLowerCase() === selector ) {
                return elem;
            }

        }

        return null;

    };

    public static openCloseMenu(menuNames: Array<string>, clickOutside?: boolean, self?: any, callFunction?: string): void {
        menuNames.forEach((name: string): void => {
            if (callFunction) {
                self[callFunction](name, clickOutside);
            } else if (clickOutside) {
                if (self.selectMenu[name]) {
                    self.selectMenu[name] = !!0;
                }
            } else {
                self.selectMenu[name] = !self.selectMenu[name];
            }
        });
    }
}