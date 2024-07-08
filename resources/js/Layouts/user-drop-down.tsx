import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAvatarName } from "@/lib/get-avatar-name";
import { User } from "@/types";
import { Link, router } from "@inertiajs/react";
import {
    FileCheck,
    Folders,
    LayoutDashboard,
    UserRound,
    Users2,
} from "lucide-react";

export const UserDropDown = ({ user }: { user: User }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full"
                >
                    {!!user.avatar ? (
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="h-full w-full"
                        />
                    ) : (
                        <p> {getAvatarName(user.name)}</p>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem>
                    <Link
                        className="flex items-center justify-between w-full"
                        href={route("profile.edit")}
                    >
                        <span>Account</span>
                        <UserRound className="h-4 w-4" />
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link
                        className="flex items-center justify-between w-full"
                        href={route("dashboard")}
                    >
                        <span>Dashboard</span>
                        <LayoutDashboard className="h-4 w-4" />
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link
                        className="flex items-center justify-between w-full"
                        href={route("project.index")}
                    >
                        <span>Projects</span>
                        <Folders className="h-4 w-4" />
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link
                        className="flex items-center justify-between w-full"
                        href={route("task.index")}
                    >
                        <span>Tasks</span>
                        <FileCheck className="h-4 w-4" />
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link
                        className="flex items-center justify-between w-full"
                        href={route("users.index")}
                    >
                        <span>Users</span>
                        <Users2 className="h-4 w-4" />
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.post(route("logout"))}>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
