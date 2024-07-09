import { ProjectsTable } from "@/components/projects-table";
import { TaskTable } from "@/components/task-table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, PaginatedData } from "@/types";
import { IProjects } from "@/types/IProjects";
import { ITasks } from "@/types/ITask";
import { IUser } from "@/types/IUser";
import { Head } from "@inertiajs/react";

const UserDetails = ({
    user,
    projects,
    tasks,
}: {
    user: IUser;
    projects: PaginatedData<IProjects>;
    tasks: PaginatedData<ITasks>;
}) => {
    return (
        <div>
            <Head title={user.name} />
            <header className="bg-black p-4">
                <div className="flex items-center gap-2">
                    <img
                        src={user.avatar || ""}
                        alt={user.name}
                        className="h-40 w-40 rounded-lg overflow-hidden shadow"
                    />
                    <div>
                        <h3 className="capitalize font-semibold text-2xl">
                            {user.name}
                        </h3>
                        <a
                            className="text-blue-700"
                            href={`mailto:${user.email}`}
                            target="_blank"
                        >
                            {user.email}
                        </a>
                    </div>
                </div>
            </header>
            <section className="space-y-6 p-6">
                <div>
                    <h1>Projects ({projects?.total})</h1>
                    <ProjectsTable projects={projects} withFilters={false} />
                </div>
                <div>
                    <h1>Tasks ({tasks.total})</h1>
                    <TaskTable tasks={tasks} withFilters={false} />
                </div>
            </section>
        </div>
    );
};

UserDetails.layout = (page: React.ReactElement<PageProps>) => (
    <AuthenticatedLayout
        page={page}
        className="p-0 sm:px-0 py-0"
        rootClassName="sm:gap-0"
    />
);
export default UserDetails;
