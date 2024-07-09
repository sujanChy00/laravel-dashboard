import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { InputField, InputFieldProps } from "./input-field";

type Data = {
    label: string;
    value: string | number;
    render?: React.ReactNode;
};

type Props<T extends string> = {
    options: Data[];
    placeholder?: string;
    value: string | number;
    name: T;
    iconLeft?: React.ReactNode;
    accept?: string;
    className?: string;
    emptyRender?: React.ReactNode;
    onChange: <T>(key: T, value?: string | number) => void;
    buttonClassName?: string;
    withRightIcon?: boolean;
} & Omit<InputFieldProps, "name" | "children">;

export const ComboBoxInput = <T extends string>({
    label,
    name,
    error,
    onChange,
    placeholder,
    className,
    iconLeft,
    emptyRender,
    value,
    options,
    buttonClassName,
    withRightIcon = true,
}: Props<T>) => {
    const [open, setOpen] = useState(false);
    return (
        <InputField
            className={className}
            name={name}
            label={label}
            error={error}
        >
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                            "justify-between flex gap-2 w-full mt-1",
                            buttonClassName,
                            "text-muted-foreground"
                        )}
                    >
                        {iconLeft}
                        {value
                            ? options.find((option) => option.value === value)
                                  ?.label
                            : placeholder}
                        {withRightIcon && (
                            <CaretSortIcon className=" h-4 w-4 shrink-0 opacity-50" />
                        )}
                        {!withRightIcon && <div />}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                    <Command>
                        <CommandInput
                            placeholder={placeholder ?? "Search..."}
                            className="h-9"
                        />
                        <CommandEmpty>
                            {emptyRender ?? "No Results Found"}
                        </CommandEmpty>
                        <CommandGroup className="max-h-80 overflow-y-scroll">
                            {options.map((option) => (
                                <CommandItem
                                    value={option.label}
                                    key={option.value}
                                    onSelect={() => {
                                        if (value === option.value)
                                            onChange(name, undefined);
                                        else onChange(name, option.value);
                                        setOpen(false);
                                    }}
                                >
                                    {option.render ?? option.label}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            option.value === value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </InputField>
    );
};
