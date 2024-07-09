import { UsersTable } from "@/components/users-table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, PaginatedData } from "@/types";
import { IUser } from "@/types/IUser";
import { ReactElement } from "react";

const Users = ({ users }: { users: PaginatedData<IUser> }) => {
    return <UsersTable data={users} />;
};

Users.layout = (page: ReactElement<PageProps>) => (
    <AuthenticatedLayout page={page} />
);

export default Users;
