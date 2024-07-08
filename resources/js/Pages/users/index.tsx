import { DataTable } from "@/Components/data-table";
import PaginationLinks from "@/Components/pagination-links";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, PaginatedData } from "@/types";
import { IUser } from "@/types/IUser";
import { Head, router } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { ReactElement } from "react";

const Users = ({ users }: { users: PaginatedData<IUser> }) => {
    const columns: ColumnDef<IUser>[] = [
        {
            accessorKey: "email",
        },
        {
            accessorKey: "name",
        },
    ];

    return (
        <div>
            <Head title="Users" />
            <DataTable
                onRowClick={(user) => router.get(route("users.show", user.id))}
                data={users.data}
                columns={columns}
            />
            <PaginationLinks data={users} />
        </div>
    );
};

Users.layout = (page: ReactElement<PageProps>) => (
    <AuthenticatedLayout page={page} />
);

export default Users;
