import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { STATUS_OPTIONS } from "@/constants/data";
import { IProjects, IStatus } from "@/types/IProjects";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import { AutoComplete } from "./auto-complete";
import { ImagePicker } from "./image-picker";

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
                <section className="col-span-4">
                    <InputLabel htmlFor="name" value="Name" />
                    <Input
                        name="name"
                        id="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        placeholder="Project name"
                    />
                    <InputError message={errors.name} />
                </section>
                <section className="col-span-4">
                    <InputLabel htmlFor="status" value="Status" />
                    <AutoComplete
                        placeholder="Status"
                        id="status"
                        name="status"
                        value={data.status}
                        className="[&_svg]:hidden w-full"
                        onValueChange={(e) => setData("status", e as IStatus)}
                        options={STATUS_OPTIONS.map((s) => ({
                            label: s.label,
                            value: s.value,
                        }))}
                    />
                    <InputError message={errors.status} />
                </section>
                <section className="col-span-4">
                    <InputLabel htmlFor="due_date" value="Due Date" />
                    <DatePicker
                        className="w-full"
                        id="due_date"
                        date={data.due_date}
                        name="due_date"
                        setDate={(e) => {
                            if (e) {
                                setData("due_date", e.toISOString() as any);
                            }
                        }}
                    />
                </section>
                <section className="col-span-12">
                    <InputLabel htmlFor="description" value="Description" />
                    <Textarea
                        name="description"
                        id="description"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        placeholder="Project description"
                    />
                    <InputError message={errors.description} />
                </section>
            </div>
            <Button type="submit" className="mt-5">
                {project ? "Update" : "Add"}
            </Button>
        </form>
    );
};
