import { TaskForm } from "@/Components/task-form";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { IProjects } from "@/types/IProjects";
import { IUser } from "@/types/IUser";
import { Head } from "@inertiajs/react";
import { ReactElement } from "react";

const CreateTask = (props: {
    auth: PageProps["auth"];
    users: IUser[];
    projects: IProjects[];
}) => {
    return (
        <>
            <Head title="Add" />
            <TaskForm {...props} />
        </>
    );
};

CreateTask.layout = (page: ReactElement<PageProps>) => (
    <AuthenticatedLayout page={page} />
);

export default CreateTask;
