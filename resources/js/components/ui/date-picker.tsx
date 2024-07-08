"use client";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import * as React from "react";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export type DatePickerProps = {
    date?: Date;
    setDate?: (d?: Date) => void;
    placeHolder?: string;
    Icon?: React.FC<any>;
    withIcon?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function DatePicker({
    placeHolder,
    Icon,
    date,
    setDate,
    withIcon,
    ...props
}: DatePickerProps) {
    const [opened, setOpened] = React.useState(false);
    const toYear = new Date().getFullYear();

    return (
        <Popover open={opened} onOpenChange={setOpened}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    {...props}
                    className={cn(
                        "justify-between items-center flex px-2",
                        !date && "text-muted-foreground",
                        props.className
                    )}
                >
                    {date ? (
                        format(date, "PPP")
                    ) : (
                        <span>{placeHolder || "Pick a date"}</span>
                    )}
                    {withIcon ? (
                        Icon ? (
                            <Icon className="h-4 w-4" />
                        ) : (
                            <CalendarDays className="h-4 w-4" />
                        )
                    ) : null}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    captionLayout="dropdown-buttons"
                    selected={date}
                    onSelect={(e) => {
                        setDate && setDate(e);
                        setOpened(false);
                    }}
                    fromYear={1950}
                    toYear={toYear + 50}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
