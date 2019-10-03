export const CLEAR_CLOUD_EFFECTS = (): void => {
    Object.keys(showed.effect).forEach( ( key: string ): void => {
        if ( showed.effect[key] )
            showed.effect = key;
    });
};