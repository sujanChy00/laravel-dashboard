import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { IProjects } from "@/types/IProjects";
import { IUser } from "@/types/IUser";

const UserDetails = ({
    user,
    projects,
}: {
    user: IUser;
    projects: IProjects;
}) => {
    return <div>{user.name}</div>;
};

UserDetails.layout = (page: React.ReactElement<PageProps>) => (
    <AuthenticatedLayout page={page} />
);
export default UserDetails;
