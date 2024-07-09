import { Button } from "@/components/ui/button";
import { PRIORITIES, STATUS_OPTIONS } from "@/constants/data";
import { PageProps } from "@/types";
import { IProjects } from "@/types/IProjects";
import { ITasks } from "@/types/ITask";
import { IUser } from "@/types/IUser";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { AutoCompleteInput } from "./form/auto-complete-input";
import { DateInput } from "./form/date-input";
import { ImagePicker } from "./form/image-picker";
import { MultiSelectInput } from "./form/multi-select-input";
import { TextAreaInput } from "./form/text-area-input";
import { TextInput } from "./form/text-input";

export const TaskForm = ({
    task,
    users,
    auth,
    projects,
}: {
    task?: ITasks;
    auth: PageProps["auth"];
    users: IUser[];
    projects: IProjects[];
}) => {
    const [image, setImage] = useState<string | undefined | null>(
        task?.image_path
    );
    const { setData, data, errors, patch, put } = useForm({
        name: task?.name,
        description: task?.description || "",
        status: task?.status,
        priority: task?.priority,
        due_date: !!task?.due_date ? new Date(task?.due_date) : undefined,
        image_path: task?.image_path,
        assigned_user_ids: task?.assigned_user_ids || [],
        project_ids: task?.project_ids || [],
        _method: task ? "PATCH" : "PUT",
    });
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (task) {
                    patch(route("task.edit", task.id));
                    return;
                }
                put(route("task.create"));
            }}
            className="space-y-6"
        >
            <ImagePicker
                image={image}
                name="image_path"
                defaultImage={data?.image_path || ""}
                onImageChange={(e) => {
                    setImage(e);
                    setData("image_path", e);
                }}
            />
            <section className="flex item-center gap-3">
                <TextInput
                    error={errors.name}
                    name="name"
                    value={data.name}
                    placeholder="Task Name"
                    className="flex-1"
                    onChange={setData}
                    label="Task Name"
                />
                <DateInput
                    error={errors.due_date}
                    name="due_date"
                    value={data.due_date}
                    className="flex-1"
                    onChange={setData}
                    label="Due date"
                />
            </section>
            <section className="flex item-center gap-3">
                <AutoCompleteInput
                    error={errors.status}
                    name="status"
                    label="Status"
                    placeholder="Status"
                    className="flex-1"
                    value={data.status}
                    onChange={setData}
                    options={STATUS_OPTIONS.map((opt) => ({
                        value: opt.value,
                        label: opt.label,
                    }))}
                />
                <AutoCompleteInput
                    error={errors.priority}
                    label="Priority"
                    className="flex-1"
                    name="priority"
                    placeholder="Priority"
                    value={data.priority}
                    onChange={setData}
                    options={PRIORITIES.map((opt) => ({
                        value: opt.value,
                        label: opt.label,
                    }))}
                />
            </section>
            <section className="flex item-center gap-3">
                <MultiSelectInput
                    error={errors.assigned_user_ids}
                    name="assigned_user_ids"
                    placeholder="select user"
                    label="Assign to"
                    className="flex-1"
                    value={data?.assigned_user_ids}
                    onChange={setData}
                    options={users.map((opt) => ({
                        value: opt.id.toString(),
                        label: auth.user.id == opt.id ? "Me" : opt.name,
                    }))}
                />
                <MultiSelectInput
                    error={errors.project_ids}
                    value={data?.project_ids}
                    label="Assign to project"
                    name="project_ids"
                    className="flex-1"
                    options={projects.map((opt) => ({
                        value: opt.id.toString(),
                        label: opt.name,
                    }))}
                    placeholder="select Projects"
                    onChange={setData}
                />
            </section>
            <TextAreaInput
                error={errors.description}
                label="Description"
                name="description"
                value={data.description}
                onChange={setData}
                placeholder="Description"
            />
            <Button type="submit">{task ? "Update" : "Add"}</Button>
        </form>
    );
};
