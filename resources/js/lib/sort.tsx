import { router } from "@inertiajs/react";
import { ChevronDown, ChevronUp } from "lucide-react";

export type IPrams = {
    size?: string;
    name?: string;
    status?: string;
    sort_order?: "asc" | "desc";
    sort_by?: string;
};

export const onSort = (name: string, routname: string, params?: IPrams) => {
    const updatedParams = { ...params };

    updatedParams.sort_by = name;
    if (params?.sort_order == "asc") {
        updatedParams.sort_order = "desc";
    } else {
        updatedParams.sort_order = "asc";
    }

    router.get(route(routname), updatedParams);
};

export const getSortIcon = (name: string, params?: IPrams) => {
    if (name == params?.sort_by) {
        if (params.sort_order == "asc") {
            return <ChevronUp className="text-muted-foreground size-5" />;
        }

        return <ChevronDown className="text-muted-foreground size-5" />;
    }
};
