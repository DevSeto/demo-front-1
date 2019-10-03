import {MainInterface} from './main.interface';

export interface MailBoxInterface extends MainInterface
{
    delete( id: number ): void;
}
