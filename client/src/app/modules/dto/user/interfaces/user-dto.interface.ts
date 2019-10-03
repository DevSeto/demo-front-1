export interface UserDtoInterface {

    alternate_email: string;
    avatar: string;
    avatar_url: string;
    company_url: string;
    created_at: string|null;
    deleted_at: string|null;
    display_user_role: string;
    email: string;
    first_name: string;
    id: number|null;
    last_name: string;
    phone: string;
    role_id: number|null;
    step: UserStepModelinterface;
    time_zone: string;
    title: string;
    updated_at: string;
    username: string;
}

export interface UserStepModelinterface {

    step: number|string|null;
    mailbox_id: null|number|string;
}