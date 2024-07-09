import { Button } from "@/components/ui/button";
import { STATUS_OPTIONS } from "@/constants/data";
import { IProjects } from "@/types/IProjects";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { AutoCompleteInput } from "./form/auto-complete-input";
import { DateInput } from "./form/date-input";
import { ImagePicker } from "./form/image-picker";
import { TextAreaInput } from "./form/text-area-input";
import { TextInput } from "./form/text-input";

export const ProjectForm = ({ project }: { project?: IProjects }) => {
    const [image, setImage] = useState<string>();
    const { setData, data, put, errors, patch } = useForm({
        name: project?.name,
        description: project?.description,
        due_date: !!project?.due_date ? new Date(project.due_date) : undefined,
        status: project?.status,
        image_path: project?.image_path,
    });
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (project) {
                    patch(route("project.edit", project.id));
                    return;
                }
                put(route("project.create"));
            }}
            className="space-y-6"
        >
            <ImagePicker
                defaultImage={data?.image_path || ""}
                name="image_path"
                image={image}
                onImageChange={(img) => {
                    setImage(img);
                    setData("image_path", img);
                }}
            />
            <div className="grid grid-cols-12 items-center gap-4">
                <TextInput
                    name="name"
                    value={data.name}
                    onChange={setData}
                    error={errors.name}
                    placeholder="Project name"
                    label="Name"
                    className="col-span-4"
                />
                <AutoCompleteInput
                    placeholder="Status"
                    label="status"
                    name="status"
                    error={errors.status}
                    value={data.status}
                    className="col-span-4"
                    inputClassName="w-full"
                    onChange={setData}
                    options={STATUS_OPTIONS.map((s) => ({
                        label: s.label,
                        value: s.value,
                    }))}
                />
                <DateInput
                    inputClassName="w-full"
                    className="col-span-4"
                    label="Due Date"
                    value={data.due_date}
                    name="due_date"
                    error={errors.due_date}
                    onChange={setData}
                />
                <TextAreaInput
                    name="description"
                    label="Description"
                    value={data.description}
                    error={errors.description}
                    onChange={setData}
                    placeholder="Project description"
                    className="col-span-12"
                />
            </div>
            <Button type="submit" className="mt-5">
                {project ? "Update" : "Add"}
            </Button>
        </form>
    );
};
