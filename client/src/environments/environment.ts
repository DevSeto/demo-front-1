import prod from './environment.prod';
import dev from './environment.dev';

const env = 'development';

const mixed =  dev;

export const environment = {
    mode: env,
    ...mixed,
};
