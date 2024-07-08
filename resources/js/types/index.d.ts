import { Config } from "ziggy-js";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    avatar: string | null;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
    flash: {
        success: string;
        error: string;
        message: string;
    };
};

export interface PaginatedData<T> {
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    data: T[];
    last_page_url: string;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: any;
    to: number;
    total: number;
    links: PaginatedLinks[];
}

export interface PaginatedLinks {
    url?: string;
    label: string;
    active: boolean;
}
