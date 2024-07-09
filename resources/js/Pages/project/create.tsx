import { ProjectForm } from "@/components/project-form";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { ReactElement } from "react";

const AddProject = () => {
    return (
        <>
            <Head title="Add" />
            <ProjectForm />
        </>
    );
};

AddProject.layout = (page: ReactElement<PageProps>) => (
    <AuthenticatedLayout page={page} />
);

export default AddProject;
