import ApplicationLogo from "@/components/ApplicationLogo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import {
    FileCheck,
    Folders,
    LayoutDashboard,
    PanelLeft,
    UserRound,
    Users2,
} from "lucide-react";

export const MobileSidebar = () => {
    const pathname = window.location.pathname;
    const isACtive = (path: string) =>
        path === pathname ? "text-foreground" : "text-muted-foreground";
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                    <PanelLeft className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                    <Link
                        href="/"
                        className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-background border text-lg font-semibold md:text-base"
                    >
                        <ApplicationLogo className="h-5 w-5 transition-all group-hover:scale-110" />
                        <span className="sr-only">Home</span>
                    </Link>
                    <Link
                        href={route("profile.edit")}
                        className={cn(
                            "flex items-center gap-4 px-2.5 hover:text-foreground",
                            isACtive("/profile")
                        )}
                    >
                        <UserRound className="h-5 w-5" />
                        Account
                    </Link>
                    <Link
                        href={route("dashboard")}
                        className={cn(
                            "flex items-center gap-4 px-2.5 hover:text-foreground",
                            isACtive("/dashboard")
                        )}
                    >
                        <LayoutDashboard className="h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link
                        href={route("project.index")}
                        className={cn(
                            "flex items-center gap-4 px-2.5 hover:text-foreground",
                            isACtive("/project")
                        )}
                    >
                        <Folders className="h-5 w-5" />
                        Projects
                    </Link>
                    <Link
                        href={route("task.index")}
                        className={cn(
                            "flex items-center gap-4 px-2.5 hover:text-foreground",
                            isACtive("/task")
                        )}
                    >
                        <FileCheck className="h-5 w-5" />
                        Tasks
                    </Link>
                    <Link
                        href={route("users.index")}
                        className={cn(
                            "flex items-center gap-4 px-2.5 hover:text-foreground",
                            isACtive("/user")
                        )}
                    >
                        <Users2 className="h-5 w-5" />
                        Users
                    </Link>
                </nav>
            </SheetContent>
        </Sheet>
    );
};
