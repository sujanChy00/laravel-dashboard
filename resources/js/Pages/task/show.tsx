import { ProjectsTable } from "@/components/projects-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UsersTable } from "@/components/users-table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, PaginatedData } from "@/types";
import { IProjects } from "@/types/IProjects";
import { ITasks } from "@/types/ITask";
import { IUser } from "@/types/IUser";
import { Head, router } from "@inertiajs/react";
import { ReactElement } from "react";

const TaskDetails = ({
    task,
    assignedUser,
    projects,
    users,
}: {
    task: ITasks;
    assignedUser: IUser;
    projects: PaginatedData<IProjects>;
    users: PaginatedData<IUser>;
}) => {
    return (
        <>
            <Head title={task.name} />
            <header className="bg-black p-4">
                <div className="flex items-stretch gap-2">
                    <img
                        src={task?.image_path || ""}
                        alt={task.name}
                        className="rounded-lg h-40 w-40"
                    />
                    <div className="flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-semibold capitalize">
                                {task.name}
                            </h3>
                            <div className="flex flex-col items-start">
                                <p className="text-sm text-muted-foreground">
                                    {task?.description}
                                </p>
                                <p className="text-sm mt-1">
                                    Created at: {task?.created_at}
                                </p>
                                {task.created_by.id != task.updated_by.id && (
                                    <Badge
                                        variant={"outline"}
                                        className="hover:underline capitalize cursor-pointer mt-4"
                                        onClick={() =>
                                            router.get(
                                                route(
                                                    "users.show",
                                                    task.updated_by.id
                                                )
                                            )
                                        }
                                    >
                                        Updated By: {task.updated_by.name}
                                    </Badge>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-3">
                            <Button
                                onClick={() =>
                                    router.delete(route("task.delete", task.id))
                                }
                                variant={"destructive"}
                            >
                                Delete
                            </Button>
                            <Button
                                onClick={() =>
                                    router.get(route("task.edit", task.id))
                                }
                                variant={"outline"}
                            >
                                Edit
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="p-4 space-y-12">
                <section className="space-y-6">
                    <h3 className="font-semibold text-2xl">
                        Projects: ({projects.total})
                    </h3>
                    <ProjectsTable projects={projects} withFilters={false} />
                </section>
                <section className="space-y-6">
                    <h3 className="font-semibold text-2xl">
                        Assigned Users: ({projects.total})
                    </h3>
                    <UsersTable data={users} />
                </section>
            </div>
        </>
    );
};

TaskDetails.layout = (page: ReactElement<PageProps>) => (
    <AuthenticatedLayout
        page={page}
        className="p-0 sm:px-0 py-0"
        rootClassName="sm:gap-0"
    />
);

export default TaskDetails;
