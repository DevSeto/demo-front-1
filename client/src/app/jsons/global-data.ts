
const REGEX: any = {
  email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
};

export class HoursDataJson {
    public sortTicketData: any = {
        new_updated: 'Updated - by Newest',
        old_updated: ' Updated - by Oldest',
        new_created: 'Created - by Newest',
        old_created: 'Created - by Oldest',
    };
    public hoursData: Array<HoursDataInterface> = [
        {
            key: 1,
            value: '01:00',
        },
        {
            key: 2,
            value: '02:00',
        },
        {
            key: 3,
            value: '03:00',
        },
        {
            key: 4,
            value: '04:00',
        },
        {
            key: 5,
            value: '05:00',
        },
        {
            key: 6,
            value: '06:00',
        },
        {
            key: 7,
            value: '07:00',
        },
        {
            key: 8,
            value: '08:00',
        },
        {
            key: 9,
            value: '09:00',
        },
        {
            key: 10,
            value: '10:00',
        },
        {
            key: 11,
            value: '11:00',
        },
        {
            key: 0,
            value: '00:00',
        },
    ];
}

export interface HoursDataInterface{
    key: number;
    value: string;
}
