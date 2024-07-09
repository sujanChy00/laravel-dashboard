import { cn } from "@/lib/utils";
import { Upload, User } from "lucide-react";
import { useState } from "react";

interface Props {
    className?: string;
    size?: number;
    onImageChange?: (img: string) => void;
    name: string;
    defaultValue?: string | null;
}

export const AvatarPicker = ({
    className,
    size = 40,
    onImageChange,
    defaultValue,
    name,
}: Props) => {
    const [image, setImage] = useState<string | undefined | null>(defaultValue);
    return (
        <>
            <label
                aria-label="avatar picker"
                className={cn(
                    "flex items-center relative justify-center group h-20 w-20 overflow-hidden border-2 border-muted-foreground bg-background rounded-full cursor-pointer",
                    className
                )}
                htmlFor={name}
            >
                {!!image && (
                    <div className="absolute bg-background/50 group-hover:opacity-100 opacity-0 transition-all ease-in-out duration-200 text-sm h-full w-full flex items-center justify-center left-0 top-0">
                        <Upload />
                    </div>
                )}
                {!!image ? (
                    <img src={image} alt={"user"} className="h-full w-full" />
                ) : (
                    <User size={size} />
                )}
            </label>
            <input
                onChange={(e) => {
                    const files = e.target.files;

                    if (files && files.length > 0) {
                        const reader = new FileReader();

                        reader.readAsDataURL(files[0]);

                        reader.onload = () => {
                            if (reader.result) {
                                setImage(reader.result as string);
                                onImageChange?.(reader?.result as string);
                            }
                        };
                    }
                }}
                type="file"
                id={name}
                className="hidden"
                accept="image/png, image/jpg, image/jpeg"
                name={name}
            />
        </>
    );
};
