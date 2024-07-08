import { CreatedBy, UpdatedBy } from "./IUser";

export interface IProjects {
    id: number;
    name: string;
    description: string;
    due_date: string;
    status: IStatus;
    image_path: string;
    created_by: CreatedBy;
    updated_by: UpdatedBy;
    created_at: string;
    updated_at: string;
}

export type IStatus = "pending" | "in_progress" | "completed";
