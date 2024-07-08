import { TaskForm } from "@/Components/task-form";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { IProjects } from "@/types/IProjects";
import { ITasks } from "@/types/ITask";
import { IUser } from "@/types/IUser";
import { Head } from "@inertiajs/react";
import { ReactElement } from "react";

const TaskEdit = (props: {
    auth: PageProps["auth"];
    users: IUser[];
    projects: IProjects[];
    task: ITasks;
}) => {
    return (
        <>
            <Head title={props.task.name.slice(0, 15) + "..."} />
            <TaskForm {...props} />
        </>
    );
};
TaskEdit.layout = (page: ReactElement<PageProps>) => (
    <AuthenticatedLayout page={page} />
);
export default TaskEdit;
