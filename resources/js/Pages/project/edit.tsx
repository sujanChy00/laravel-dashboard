import { ProjectForm } from "@/Components/project-form";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { IProjects } from "@/types/IProjects";
import { Head } from "@inertiajs/react";
import { ReactElement } from "react";

const EditProject = ({ project }: { project: IProjects }) => {
    return (
        <>
            <Head title={project.name.slice(0, 15) + "..."} />
            <ProjectForm project={project} />
        </>
    );
};

EditProject.layout = (page: ReactElement<PageProps>) => (
    <AuthenticatedLayout page={page} />
);

export default EditProject;
