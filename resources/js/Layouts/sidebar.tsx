import ApplicationLogo from "@/components/ApplicationLogo";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import {
    FileCheck,
    Folders,
    LayoutDashboard,
    UserRound,
    Users2,
} from "lucide-react";

export const Sidebar = () => {
    const pathname = window.location.pathname;
    const isACtive = (path: string) => {
        const paths = pathname.split("/");
        if (paths[1] == path) {
            return "bg-accent text-accent-foreground";
        }
        return "text-muted-foreground";
    };
    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-black sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <Link
                    href="/"
                    className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-background border text-lg font-semibold  md:h-8 md:w-8 md:text-base"
                >
                    <ApplicationLogo className="h-4 w-4 transition-all group-hover:scale-110" />
                    <span className="sr-only">Home</span>
                </Link>

                <Tooltip label="Account" side="right" delayDuration={0}>
                    <Link
                        href={route("profile.edit")}
                        className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8",
                            isACtive("profile")
                        )}
                    >
                        <UserRound className="h-5 w-5" />
                        <span className="sr-only">Account</span>
                    </Link>
                </Tooltip>
                <Tooltip label="dashboard" side="right" delayDuration={0}>
                    <Link
                        href={route("dashboard")}
                        className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8",
                            isACtive("dashboard")
                        )}
                    >
                        <LayoutDashboard className="h-5 w-5" />
                        <span className="sr-only">Dashboard</span>
                    </Link>
                </Tooltip>
                <Tooltip label="Projects" side="right" delayDuration={0}>
                    <Link
                        href={route("project.index")}
                        className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8",
                            isACtive("project")
                        )}
                    >
                        <Folders className="h-5 w-5" />
                        <span className="sr-only">Projects</span>
                    </Link>
                </Tooltip>
                <Tooltip label="Tasks" side="right" delayDuration={0}>
                    <Link
                        href={route("task.index")}
                        className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8",
                            isACtive("task")
                        )}
                    >
                        <FileCheck className="h-5 w-5" />
                        <span className="sr-only">Tasks</span>
                    </Link>
                </Tooltip>
                <Tooltip label="Users" side="right" delayDuration={0}>
                    <Link
                        href={route("users.index")}
                        className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8",
                            isACtive("user")
                        )}
                    >
                        <Users2 className="h-5 w-5" />
                        <span className="sr-only">Users</span>
                    </Link>
                </Tooltip>
            </nav>
        </aside>
    );
};
