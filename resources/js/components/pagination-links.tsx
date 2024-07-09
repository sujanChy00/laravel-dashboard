import { buttonVariants } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { PaginatedData } from "@/types";
import { Link } from "@inertiajs/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationLinks = <T extends any>({
    data,
    nextandprevonly,
    className,
}: {
    data: PaginatedData<T>;
    nextandprevonly?: boolean;
    className?: string;
}) => {
    if (data.data.length < data.per_page) return null;
    return (
        <Pagination className={cn("my-4 mx-0", className)}>
            <PaginationContent className="m-0">
                <Link
                    preserveScroll
                    href={data.prev_page_url}
                    className={buttonVariants({
                        size: "icon",
                        className: "h-8 w-8",
                        variant: "outline",
                    })}
                >
                    <ChevronLeft />
                </Link>

                {!nextandprevonly &&
                    data.links.map((link, i) => {
                        if (
                            link.label.includes("Previous") ||
                            link.label.includes("Next")
                        ) {
                            return null;
                        }

                        return (
                            <PaginationItem key={i} className="list-none">
                                <PaginationLink
                                    href={link.url ?? "#"}
                                    className={buttonVariants({
                                        size: "icon",
                                        className: "h-8 w-8",
                                        variant: link.active
                                            ? "secondary"
                                            : "ghost",
                                    })}
                                    isActive={link.active}
                                >
                                    {link.label}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })}

                <Link
                    preserveScroll
                    href={data.next_page_url}
                    className={buttonVariants({
                        size: "icon",
                        className: "h-8 w-8",
                        variant: "outline",
                    })}
                >
                    <ChevronRight />
                </Link>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationLinks;
