import { MultiSelect } from "../ui/multi-select";
import { InputField, InputFieldProps } from "./input-field";

type Data = {
    label: string;
    value: string | number;
};

type Props<T extends string> = {
    options: Data[];
    placeholder?: string;
    value: (string | number)[];
    name: T;
    accept?: string;
    className?: string;
    emptyRender?: React.ReactNode;
    onChange: <T>(key: T, value: (string | number)[]) => void;
} & Omit<InputFieldProps, "name" | "children">;

export const MultiSelectInput = <T extends string>({
    label,
    name,
    error,
    onChange,
    placeholder,
    className,
    emptyRender,
    value,
    options,
}: Props<T>) => {
    return (
        <InputField
            className={className}
            name={name}
            label={label}
            error={error}
        >
            <MultiSelect
                className="mt-1"
                options={options}
                placeholder={placeholder}
                onChange={(value) =>
                    onChange(
                        name,
                        value.map((item) => item.value)
                    )
                }
                value={
                    value
                        .map((item) => {
                            return options.find(
                                (option) => option.value === item
                            );
                        })
                        .filter((item) => item !== undefined) as Data[]
                }
            />
        </InputField>
    );
};
