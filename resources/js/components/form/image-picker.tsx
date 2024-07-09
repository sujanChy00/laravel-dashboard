export const ImagePicker = ({
    image,
    defaultImage,
    onImageChange,
    name,
}: {
    image?: string | null;
    defaultImage?: string;
    onImageChange?: (img: string) => void;
    name: string;
}) => {
    return (
        <>
            <label
                htmlFor={name}
                className="w-32 h-32 block overflow-hidden relative rounded-lg cursor-pointer"
            >
                {!!image && (
                    <img
                        alt={defaultImage}
                        src={image || ""}
                        className="w-full h-32 rounded-lg"
                    />
                )}
                <div className="flex h-full w-full bg-black/50 absolute inset-0 items-center justify-center">
                    Choose image
                </div>
            </label>
            <input
                name={name}
                id={name}
                className="hidden"
                type="file"
                accept="image/jpg, image/png, image/jpeg"
                onChange={(e) => {
                    const files = e.target.files;

                    if (files && files.length > 0) {
                        const reader = new FileReader();

                        reader.readAsDataURL(files[0]);

                        reader.onload = () => {
                            if (reader.result) {
                                onImageChange?.(reader.result as string);
                            }
                        };
                    }
                }}
            />
        </>
    );
};
