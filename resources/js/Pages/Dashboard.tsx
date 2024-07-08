import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { ReactElement } from "react";

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div>Dashboard</div>
        </>
    );
}

Dashboard.layout = (page: ReactElement<PageProps>) => (
    <AuthenticatedLayout page={page} />
);
