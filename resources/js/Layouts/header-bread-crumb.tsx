import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "@inertiajs/react";

export const HeaderBreadCrumb = () => {
    const pathnames = window.location.pathname.split("/");
    return (
        <Breadcrumb className="hidden md:flex">
            <BreadcrumbList className="flex items-center gap-1">
                {pathnames.map(
                    (path, index) =>
                        !!path && (
                            <div
                                className="flex items-center gap-1"
                                key={index}
                            >
                                {index == 1 && (
                                    <BreadcrumbSeparator>/</BreadcrumbSeparator>
                                )}
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        {pathnames.length - 1 === index ? (
                                            <Link href={path}>{path}</Link>
                                        ) : (
                                            <span className="text-white">
                                                {path}
                                            </span>
                                        )}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {pathnames.length - 1 !== index && (
                                    <BreadcrumbSeparator>/</BreadcrumbSeparator>
                                )}
                            </div>
                        )
                )}
            </BreadcrumbList>
        </Breadcrumb>
    );
};
