import {UserDtoInterface} from './user-dto.interface';

export interface UserExpandedDtoInterface extends UserDtoInterface {

    mailbox_id: number|null;
    mailboxes: Array<number>;
    alternate_email: string ;
    avatar_url: string ;
    avatar: string;
    company_url: string;
    created_at: string|null ;
    deleted_at: string|null ;
    display_user_role: string ;
    email: string;
    first_name: string;
    id: number|null;
    last_name: string;
    phone: string ;
    role_id: number|null;
    step: UserStepModelinterface ;
    preferences: UserPreferencesInterface;
    time_zone: string;
    title: string;
    updated_at: string;
    username: string;
}
export interface UserStepModelinterface {

    step: number|string|null;
    mailbox_id: null|number|string;
}
export class UserPreferencesInterface {

    answer: string;
    assign_after_note: number;
    assign_after_reply: number;
    created_at: string;
    delay_sending: number;
    deleted_at: null | string;
    id: number;
    take_back_after_note: number;
    take_back_after_reply: number;
    take_back_after_update: number;
    updated_at: string;
    user_id: number;
}
