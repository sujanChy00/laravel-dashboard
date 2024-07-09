import { TaskTable, TaskTableProps } from "@/components/task-table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { ReactElement } from "react";

const Tasks = (props: TaskTableProps) => {
    return <TaskTable {...props} />;
};

Tasks.layout = (page: ReactElement<PageProps>) => (
    <AuthenticatedLayout page={page} />
);
export default Tasks;
