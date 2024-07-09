import { IStatus } from "./IProjects";
import { IUser } from "./IUser";

export interface ITasks {
    id: number;
    name: string;
    description: string | null;
    image_path: string | null;
    status: IStatus;
    priority: string;
    due_date: Date | null;
    assigned_user_ids: number[];
    project_ids: number[];
    created_by: IUser;
    updated_by: IUser;
    assigned_to: IUser;
    created_at: string;
}
