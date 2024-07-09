import { Flash } from "@/components/flash-message";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import { ReactElement } from "react";
import { HeaderBreadCrumb } from "./header-bread-crumb";
import { MobileSidebar } from "./mobile-sidebar";
import { Sidebar } from "./sidebar";
import { UserDropDown } from "./user-drop-down";

export default function AuthenticatedLayout({
    className,
    rootClassName,
    page,
}: {
    page: ReactElement<PageProps>;
    className?: string;
    rootClassName?: string;
}) {
    return (
        <div className="flex min-h-screen w-full flex-col bg-black/50">
            <Flash />
            <Sidebar />
            <div
                className={cn("flex flex-col sm:gap-4 sm:pl-14", rootClassName)}
            >
                <header className="sticky flex bg-black/50 backdrop-blur-md py-3 border-b items-center justify-between top-0 z-50 px-4 sm:px-6">
                    <MobileSidebar />
                    <HeaderBreadCrumb />
                    <UserDropDown user={page.props.auth.user} />
                </header>
                <main
                    className={cn(
                        "grid flex-1 items-start gap-4 p-4 sm:px-6 py-6 md:gap-8",
                        className
                    )}
                >
                    {page}
                </main>
            </div>
        </div>
    );
}
