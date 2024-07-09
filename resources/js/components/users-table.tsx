import { DataTable } from "@/components/data-table";
import PaginationLinks from "@/components/pagination-links";
import { getAvatarName } from "@/lib/get-avatar-name";
import { PaginatedData } from "@/types";
import { IUser } from "@/types/IUser";
import { Head, router } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";

export const UsersTable = ({ data }: { data: PaginatedData<IUser> }) => {
    const columns: ColumnDef<IUser>[] = [
        {
            accessorKey: "id",
        },
        {
            accessorKey: "name",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <div className="h-10 w-10 bg-muted flex items-center justify-center rounded-full border-muted-foreground border overflow-hidden">
                        {!!row.original.avatar ? (
                            <img
                                src={row.original.avatar}
                                alt={row.original.name}
                                className="h-full w-full"
                            />
                        ) : (
                            getAvatarName(row.original.name)
                        )}
                    </div>
                    <p>{row.original.name}</p>
                </div>
            ),
        },
        {
            accessorKey: "email",
        },
        {
            accessorKey: "created_at",
            header: "created at",
            cell: ({ row }) => new Date(row.original.created_at).toDateString(),
        },
    ];

    return (
        <div>
            <Head title="Users" />
            <DataTable
                onRowClick={(user) => router.get(route("users.show", user.id))}
                data={data.data}
                columns={columns}
            />
            <PaginationLinks data={data} />
        </div>
    );
};
