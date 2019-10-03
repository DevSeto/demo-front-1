export class UserModel {
    public mailbox_id: number|null = null;
    public mailboxes: Array<number> = [];
    public avatar_url: string = '';
    public alternate_email: string = '';
    public avatar: string = '';
    public company_url: string = '';
    public created_at: string|null = '';
    public deleted_at: string|null = null;
    public display_user_role: string = '';
    public email: string = '';
    public first_name: string = '';
    public id: number|null = null;
    public last_name: string = ' ';
    public phone: string = '';
    public role_id: number|null = null;
    public step: any = UserStepModel;
    public time_zone: string = '';
    public preferences: UserPreferencesModel = new UserPreferencesModel();
    public title: string = '';
    public updated_at: string = '';
    public username: string = '';
}

export class UserPreferencesModel {

    public answer: string;
    public assign_after_note: number;
    public assign_after_reply: number;
    public created_at: string;
    public  delay_sending: number;
    public deleted_at: null | string;
    public id: number;
    public take_back_after_note: number;
    public take_back_after_reply: number;
    public take_back_after_update: number;
    public updated_at: string;
    public user_id: number;
}
export class UserStepModel {

    public step: number|string|null = null;
    public mailbox_id: null|number|string = null;
}
