export interface MainInterface {

    select(): any;
    insert( data: any ): void;
    update( data: any ): void;
    deleteProperty( propertyName: string ): void;
    updateProperty( propertyName: string, data: any ): void;
    insertProperty( propertyName: string, data: any ): void;
    getProperty( propertyName: string ): any;
    id( id: number ): any;

    extractData: any;
    handleError: any;
    dataCompile: (data: any) => string;
}