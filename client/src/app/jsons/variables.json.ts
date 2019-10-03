export class VariablesJson {

    public json: Array<VariablesInterface> = [
        {
            key: 'user first name',
            value: '{%user.first_name%}',
        },
        {
            key: 'user last name',
            value: '{%user.last_name%}',
        },
        {
            key: 'user full name',
            value: '{%user.full_name%}',
        },
        {
            key: 'company name',
            value: '{%company.name%}',
        },

        {
            key: 'agent first name',
            value: '{%agent.first_name%}',
        },
        {
            key: 'agent last name',
            value: '{%agent.last_name%}',
        },
        {
            key: 'agent full name',
            value: '{%agent.full_name%}',
        },
        {
            key: 'agent email',
            value: '{%agent.email%}',
        },
    ];

}

export interface VariablesInterface{
    key: string;
    value: string;
}