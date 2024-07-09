import ApplicationLogo from "@/components/ApplicationLogo";
import { buttonVariants } from "@/components/ui/button";
import { UserDropDown } from "@/Layouts/user-drop-down";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    return (
        <>
            <Head title="Welcome" />
            <header className="flex items-center justify-between sticky top-0 z-30 border-b border-b-border h-16 px-4">
                <Link href="/">
                    <ApplicationLogo className="w-12 h-12 fill-current text-gray-500" />
                </Link>
                {auth?.user && <UserDropDown user={auth.user} />}
                {!auth?.user && (
                    <div className="flex items-center gap-4">
                        <Link
                            href={route("register")}
                            className={cn(
                                buttonVariants({
                                    variant: "ghost",
                                }),
                                "rounded-full"
                            )}
                        >
                            Sign up
                        </Link>
                        <Link
                            href={route("login")}
                            className={cn(
                                buttonVariants({
                                    variant: "default",
                                }),
                                "rounded-full"
                            )}
                        >
                            Login
                        </Link>
                    </div>
                )}
            </header>
            <main
                className="flex items-center justify-center"
                style={{
                    minHeight: "calc(100vh - 4rem)",
                }}
            >
                <div>
                    <h1 className="font-extrabold text-5xl">Welcome </h1>
                </div>
            </main>
        </>
    );
}
