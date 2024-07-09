import { ProjectsTable } from "@/components/projects-table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { IPrams } from "@/lib/sort";
import { PageProps, PaginatedData } from "@/types";
import { IProjects } from "@/types/IProjects";
import { Head } from "@inertiajs/react";
import { ReactElement } from "react";

interface Props {
    projects: PaginatedData<IProjects>;
    params?: IPrams;
}

const ProjectsPage = (props: Props) => {
    return (
        <>
            <Head title="Projects" />
            <ProjectsTable {...props} />
        </>
    );
};

ProjectsPage.layout = (page: ReactElement<PageProps>) => (
    <AuthenticatedLayout page={page} />
);

export default ProjectsPage;
