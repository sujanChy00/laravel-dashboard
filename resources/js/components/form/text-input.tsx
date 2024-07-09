import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { InputField, InputFieldProps } from "./input-field";

type Props<T extends string> = {
    value?: string;
    name: T;
    className?: string;
    onChange: <T>(key: T, value: string) => void;
    placeholder?: string;
    type?: "email" | "text" | "password" | "number" | "tel" | "url";
    inputClassName?: string;
} & Omit<InputFieldProps, "name" | "children">;

export const TextInput = <T extends string>({
    label,
    name,
    error,
    onChange,
    className,
    value,
    type = "text",
    placeholder,
    inputClassName,
}: Props<T>) => {
    return (
        <InputField
            className={className}
            name={name}
            label={label}
            error={error}
        >
            <Input
                className={cn("mt-1 block w-full", inputClassName)}
                id={name}
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                autoComplete={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChange(name, e.target.value)
                }
            />
        </InputField>
    );
};
