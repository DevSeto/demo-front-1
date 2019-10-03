import {MainInterface} from './main.interface';

export interface TicketsInterface extends MainInterface {

    delete( id: number ): void;
}