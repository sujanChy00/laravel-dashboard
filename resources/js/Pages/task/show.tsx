import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { PageProps } from "@/types";
import { ITasks } from "@/types/ITask";
import { router } from "@inertiajs/react";
import { Trash } from "lucide-react";
import { ReactElement } from "react";

const TaskDetails = ({ task }: { task: ITasks }) => {
    console.log(task);
    return (
        <div>
            <Button
                className="flex items-center justify-between w-full"
                onClick={() => router.delete(route("task.delete", task.id))}
            >
                Delete
                <Trash className="h-4 w-4" />
            </Button>
        </div>
    );
};

TaskDetails.layout = (page: ReactElement<PageProps>) => (
    <AuthenticatedLayout page={page} />
);

export default TaskDetails;
