import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";

export const Flash = () => {
    const {
        props: { flash },
    } = usePage<PageProps>();

    useEffect(() => {
        if (!!flash?.success) {
            toast.success(flash.success, {
                dismissible: true,
            });
        }
        if (!!flash?.error) {
            toast.error(flash.error, {
                dismissible: true,
            });
        }
        if (!!flash?.message) {
            toast.info(flash.message, {
                dismissible: true,
            });
        }
    }, [flash]);

    return null;
};
