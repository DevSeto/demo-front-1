declare let showed: any;

interface RouteInterface {
    current?: string,
    last?: string
}

interface ticketsFilter {
    status?: string;
}

interface ResponseData<T> {
    success: boolean,
    data: T|any
}

type LastRoute = RouteInterface;
type TicketFilters = ticketsFilter;

