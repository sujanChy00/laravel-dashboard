import { DataTable } from "@/Components/data-table";
import PaginationLinks from "@/Components/pagination-links";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { STATUS_OPTIONS, statusTheme } from "@/constants/data";
import { IPrams, getSortIcon, onSort } from "@/lib/sort";
import { cn } from "@/lib/utils";
import { PageProps, PaginatedData } from "@/types";
import { IProjects } from "@/types/IProjects";
import { Head, Link, router } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, Edit, Eye, Filter, Trash, X } from "lucide-react";
import { ReactElement, useState } from "react";

interface Props {
    projects: PaginatedData<IProjects>;
    params?: IPrams;
}

const ProjectsPage = ({ projects, params }: Props) => {
    const [name, setName] = useState(params?.name || "");
    const columns: ColumnDef<IProjects>[] = [
        {
            accessorKey: "id",
        },
        {
            accessorKey: "name",

            header: () => (
                <div
                    className="cursor-pointer flex items-center gap-1"
                    onClick={() => onSort("name", "project.index", params)}
                >
                    {getSortIcon("name", params)}
                    name
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex items-center gap-1">
                    <img
                        className="h-8 w-8 rounded-md"
                        alt={row.original.name}
                        src={row.original.image_path}
                    />
                    <p>{row.original.name.slice(0, 15)}...</p>
                </div>
            ),
        },
        {
            accessorKey: "description",
            cell: ({ row }) => row.original.description.slice(0, 100),
        },
        {
            accessorKey: "status",
            cell: ({ row }) => (
                <Badge
                    className={cn(
                        "text-foreground",
                        statusTheme[row.original.status]
                    )}
                >
                    {row.original.status.replaceAll("_", " ")}
                </Badge>
            ),
        },
        {
            accessorKey: "created_at",
            header: () => (
                <div
                    className="cursor-pointer flex items-center gap-1"
                    onClick={() =>
                        onSort("created_at", "project.index", params)
                    }
                >
                    {getSortIcon("created_at", params)}
                    created at
                </div>
            ),
            cell: ({ row }) => new Date(row.original.created_at).toDateString(),
        },
        {
            accessorKey: "image_path",
            header: "action",
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant={"ghost"}
                            size={"icon"}
                            className="h-8 w-8 flex-col items-center justify-center gap-0"
                        >
                            ...
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <Link
                                className="flex items-center justify-between w-full"
                                href={route("project.show", row.original.id)}
                            >
                                View
                                <Eye className="h-4 w-4" />
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link
                                className="flex items-center justify-between w-full"
                                href={route("project.edit", row.original.id)}
                            >
                                Edit
                                <Edit className="h-4 w-4" />
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <div
                                className="flex items-center justify-between w-full cursor-pointer"
                                onClick={() =>
                                    router.delete(
                                        route("project.delete", row.original.id)
                                    )
                                }
                            >
                                Delete
                                <Trash className="h-4 w-4" />
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    const onSearch = () => {
        const updatedParams = { ...params };
        if (name) {
            updatedParams.name = name;
        } else {
            delete updatedParams.name;
        }
        router.get(route("project.index"), updatedParams);
    };
    return (
        <div className="space-y-5">
            <Head title="Projects" />
            <div className="flex items-center justify-between">
                <h1>Projects({projects.total})</h1>
                <Input
                    className="flex-[0.6]"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    placeholder="Search..."
                    onKeyDownCapture={(e) => {
                        if (e.key == "Enter") {
                            onSearch();
                        }
                    }}
                />
                <div className="flex items-center gap-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1">
                            <div className="flex items-center gap-0.5 text-muted">
                                <Filter className="text-muted h-5 w-5" />:
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                                <p>
                                    {STATUS_OPTIONS.find(
                                        (s) => s.value == params?.status
                                    )?.label || "All"}
                                </p>
                                <ChevronDown />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="">
                            {STATUS_OPTIONS.map((s) => (
                                <DropdownMenuItem className="" key={s.value}>
                                    <Link
                                        className="block"
                                        href={route("project.index", {
                                            ...params,
                                            status: s.value,
                                        })}
                                    >
                                        {s.label}
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <p
                        onClick={() => {
                            const updatedParams = { ...params };
                            delete updatedParams.status;
                            delete updatedParams.name;
                            delete updatedParams.sort_by;
                            delete updatedParams.sort_order;
                            router.get(route("project.index"), updatedParams);
                        }}
                        className="text-destructive flex items-center gap-1 cursor-pointer"
                    >
                        clear <X className="h-4 w-4" />
                    </p>
                    <Link href={route("project.create")}>
                        <Button>Add</Button>
                    </Link>
                </div>
            </div>
            <DataTable columns={columns} data={projects.data} />
            <PaginationLinks data={projects} />
        </div>
    );
};

ProjectsPage.layout = (page: ReactElement<PageProps>) => (
    <AuthenticatedLayout page={page} />
);

export default ProjectsPage;
