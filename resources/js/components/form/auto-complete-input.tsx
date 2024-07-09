import { cn } from "@/lib/utils";
import { AutoComplete, Option } from "../ui/auto-complete";
import { InputField, InputFieldProps } from "./input-field";

type Props<T extends string> = {
    value?: string;
    name: T;
    className?: string;
    onChange: <T>(key: T, value: string) => void;
    placeholder?: string;
    inputClassName?: string;
    label?: string;
} & Omit<InputFieldProps, "name" | "children"> & { options: Option[] };

export const AutoCompleteInput = <T extends string>({
    name,
    onChange,
    className,
    inputClassName,
    placeholder,
    value,
    error,
    label,
    options,
}: Props<T>) => {
    return (
        <InputField
            className={className}
            name={name}
            label={label}
            error={error}
        >
            <AutoComplete
                placeholder={placeholder}
                name={name}
                className={cn("[&_svg]:hidden", inputClassName)}
                value={value}
                options={options}
                onValueChange={(e) => {
                    onChange(name, e);
                }}
            />
        </InputField>
    );
};
