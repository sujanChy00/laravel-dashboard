import { TaskTable } from "@/components/task-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { statusTheme } from "@/constants/data";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { IPrams } from "@/lib/sort";
import { cn } from "@/lib/utils";
import { PageProps, PaginatedData } from "@/types";
import { IProjects } from "@/types/IProjects";
import { ITasks } from "@/types/ITask";
import { Head, Link, router } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { ReactElement } from "react";

const ProjectDetails = ({
    project,
    ...props
}: {
    project: IProjects;
    tasks: PaginatedData<ITasks>;
    params?: IPrams;
}) => {
    return (
        <>
            <Head title={project.name.slice(0, 15) + "..."} />
            <div className="bg-black p-4">
                <section className="flex items-center gap-3">
                    <img
                        src={project.image_path || ""}
                        alt={project.name}
                        className="rounded-lg h-40 w-40 shadow"
                    />
                    <div className="space-y-2">
                        <h1 className="text-2xl font-medium capitalize">
                            {project.name}
                        </h1>
                        <div className="space-y-1">
                            <div className="flex items-center gap-1">
                                <p>status:</p>
                                <Badge
                                    className={cn(
                                        "text-foreground",
                                        statusTheme[project.status]
                                    )}
                                >
                                    {project.status.replaceAll("_", " ")}
                                </Badge>
                            </div>
                            <p>{project.description}</p>
                        </div>
                    </div>
                </section>
                <section className="pt-5 flex gap-3 items-center justify-between">
                    <div className="flex flex-col gap-1 items-start">
                        <Link
                            className="capitalize hover:underline"
                            href={route("users.show", project.created_by.id)}
                        >
                            Created By: {project.created_by?.name || "unknown"}
                        </Link>
                        {project.created_by.id !== project.updated_by.id && (
                            <Link
                                className="capitalize hover:underline"
                                href={route(
                                    "users.show",
                                    project.updated_by.id
                                )}
                            >
                                Updated By:{" "}
                                {project.updated_by?.name || "unknown"}
                            </Link>
                        )}
                        <p>Created At: {project?.created_at}</p>
                    </div>
                    <div className="flex gap-3 items-center">
                        <Link href={route("project.edit", project.id)}>
                            <Button>Edit</Button>
                        </Link>
                        <Button
                            onClick={() =>
                                router.delete(
                                    route("project.delete", project.id)
                                )
                            }
                            variant={"destructive"}
                        >
                            Delete
                        </Button>
                    </div>
                </section>
            </div>
            <div className="space-y-6 m-4 p-4 rounded-lg shadow bg-black">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Tasks</h1>
                    <Button onClick={() => router.get(route("task.create"))}>
                        <Plus /> Add
                    </Button>
                </div>
                <TaskTable withFilters={false} {...props} />
            </div>
        </>
    );
};

ProjectDetails.layout = (page: ReactElement<PageProps>) => (
    <AuthenticatedLayout
        page={page}
        className="p-0 sm:px-0 py-0"
        rootClassName="sm:gap-0"
    />
);

export default ProjectDetails;
