import {
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Command as CommandPrimitive } from "cmdk";
import { useCallback, useRef, useState, type KeyboardEvent } from "react";

export type Option = Record<"value" | "label", string> & Record<string, string>;

type AutoCompleteProps = {
    options: Option[];
    emptyMessage?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    isLoading?: boolean;
    disabled?: boolean;
    placeholder?: string;
    className?: string;
    onBlur?: () => void;
    name?: string;
    id?: string;
};

export const AutoComplete = ({
    options,
    placeholder,
    emptyMessage,
    value,
    onValueChange,
    disabled,
    isLoading = false,
    className,
    onBlur,
    name,
    id,
}: AutoCompleteProps) => {
    const defaultValue = value
        ? options.find((opt) => opt.value == value)?.label
        : "";
    const inputRef = useRef<HTMLInputElement>(null);
    const [isOpen, setOpen] = useState(false);
    const [selected, setSelected] = useState<string | undefined>(defaultValue);
    const [inputValue, setInputValue] = useState<string | undefined>(
        defaultValue
    );

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLDivElement>) => {
            const input = inputRef.current;
            if (!input) {
                return;
            }

            if (!isOpen) {
                setOpen(true);
            }

            if (event.key === "Enter" && input.value !== "") {
                const optionToSelect = options.find(
                    (option) => option.value === input.value
                );
                if (optionToSelect) {
                    setSelected(optionToSelect?.value);
                    onValueChange?.(optionToSelect.value);
                }
            }

            if (event.key === "Escape") {
                input.blur();
            }
        },
        [isOpen, options, onValueChange]
    );

    const handleBlur = useCallback(() => {
        setOpen(false);
    }, [selected]);

    const handleSelectOption = useCallback(
        (value: string) => {
            const selectedOption = options.find((opt) => opt.value == value);
            setInputValue(selectedOption?.label);

            setSelected(selectedOption?.value);
            onValueChange?.(selectedOption?.value as string);
            setTimeout(() => {
                inputRef?.current?.blur();
            }, 0);
        },
        [onValueChange]
    );

    return (
        <CommandPrimitive onKeyDown={handleKeyDown} className="w-full">
            <div
                className={cn(
                    "border border-border rounded-lg [&>div]:border-none border-none",
                    className
                )}
            >
                <CommandInput
                    ref={inputRef}
                    value={inputValue}
                    onValueChange={isLoading ? undefined : setInputValue}
                    onBlur={() => {
                        handleBlur();
                        onBlur?.();
                    }}
                    onFocus={() => setOpen(true)}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="text-base w-full"
                    name={name}
                    id={id}
                />
            </div>
            <div className="relative mt-1">
                <div
                    className={cn(
                        "animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 w-full",
                        isOpen ? "block" : "hidden"
                    )}
                >
                    <CommandList className="shadow rounded-lg bg-background">
                        {isLoading ? (
                            <CommandPrimitive.Loading>
                                <div className="p-1 space-y-1 text-center h-32 flex items-center justify-center">
                                    searching...
                                </div>
                            </CommandPrimitive.Loading>
                        ) : null}
                        {options.length > 0 && !isLoading ? (
                            <CommandGroup>
                                {options.map((option) => {
                                    const isSelected =
                                        selected === option.value;
                                    return (
                                        <CommandItem
                                            key={option.value}
                                            value={option.label}
                                            onMouseDown={(event) => {
                                                event.preventDefault();
                                                event.stopPropagation();
                                            }}
                                            onSelect={() =>
                                                handleSelectOption(option.value)
                                            }
                                            className={
                                                "flex w-full items-center gap-2"
                                            }
                                        >
                                            {option.label}
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        ) : null}
                        {!isLoading ? (
                            <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-sm">
                                {emptyMessage || "No results..."}
                            </CommandPrimitive.Empty>
                        ) : null}
                    </CommandList>
                </div>
            </div>
        </CommandPrimitive>
    );
};
