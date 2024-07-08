import { IStatus } from "./IProjects";

export interface ITasks {
    id: number;
    name: string;
    description: string | null;
    image_path: string | null;
    status: IStatus;
    priority: string;
    due_date: Date | null;
    assigned_user_id: number;
    project_id: number;
    created_by: number;
    updated_by: number;
    created_at: string;
}
