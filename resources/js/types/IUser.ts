export interface CreatedBy {
    id: string;
    name: string;
    email: string;
    created_by: string;
}

export interface UpdatedBy {
    id: string;
    name: string;
    email: string;
    updated_by: string;
}

export interface IUser {
    created_at: string;
    email: string;
    email_verified_at: string;
    id: number;
    name: string;
    updated_at: string;
}
