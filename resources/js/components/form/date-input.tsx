"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";

import { useState } from "react";
import { InputField, InputFieldProps } from "./input-field";

type Props<T extends string> = {
    value?: Date;
    name: T;
    className?: string;
    onChange: <T>(key: T, value?: Date) => void;
    inputClassName?: string;
} & Omit<InputFieldProps, "name" | "children">;

export const DateInput = <T extends string>({
    label,
    name,
    error,
    onChange,
    className,
    value,
    inputClassName,
}: Props<T>) => {
    const [opened, setOpened] = useState(false);
    return (
        <InputField
            className={className}
            name={name}
            label={label}
            error={error}
        >
            <Popover open={opened} onOpenChange={setOpened}>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-full pl-3 text-left font-normal flex mt-1",
                            !value && "text-muted-foreground",
                            inputClassName
                        )}
                    >
                        {value ? (
                            format(value, "PPP")
                        ) : (
                            <span>Pick a date</span>
                        )}
                        <CalendarDays className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={value}
                        onSelect={(date) => {
                            onChange(name, date);
                            setOpened(false);
                        }}
                        disabled={(date) => date < new Date()}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </InputField>
    );
};
