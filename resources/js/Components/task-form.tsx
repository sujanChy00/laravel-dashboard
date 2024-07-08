import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { PRIORITIES, STATUS_OPTIONS } from "@/constants/data";
import { PageProps } from "@/types";
import { IProjects, IStatus } from "@/types/IProjects";
import { ITasks } from "@/types/ITask";
import { IUser } from "@/types/IUser";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import { AutoComplete } from "./auto-complete";
import { ImagePicker } from "./image-picker";

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
        assigned_user_id: task?.assigned_user_id,
        project_id: task?.project_id,
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
                <div className="space-y-1 flex-1">
                    <InputLabel value="Name" htmlFor="name" />
                    <Input
                        name="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        placeholder="Task Name"
                    />
                    <InputError message={errors.name} />
                </div>
                <div className="space-y-1 flex-1">
                    <InputLabel value="Description" htmlFor="description" />
                    <Input
                        name="description"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        placeholder="Description"
                    />
                    <InputError message={errors.description} />
                </div>
            </section>
            <section className="flex item-center gap-3">
                <div className="space-y-1 flex-1">
                    <InputLabel value="Status" htmlFor="status" />
                    <AutoComplete
                        name="status"
                        placeholder="Status"
                        className="[&_svg]:hidden"
                        value={data.status}
                        onValueChange={(e) => setData("status", e as IStatus)}
                        options={STATUS_OPTIONS.map((opt) => ({
                            value: opt.value,
                            label: opt.label,
                        }))}
                    />
                    <InputError message={errors.status} />
                </div>
                <div className="space-y-1 flex-1">
                    <InputLabel value="Priority" htmlFor="priority" />
                    <AutoComplete
                        name="priority"
                        placeholder="Priority"
                        className="[&_svg]:hidden"
                        value={data.priority}
                        onValueChange={(e) => setData("priority", e)}
                        options={PRIORITIES.map((opt) => ({
                            value: opt.value,
                            label: opt.label,
                        }))}
                    />
                    <InputError message={errors.priority} />
                </div>
            </section>
            <section className="flex item-center gap-3">
                <div className="space-y-1 flex-1">
                    <InputLabel value="Due date" htmlFor="due_date" />
                    <DatePicker
                        name="due_date"
                        date={data.due_date}
                        className="w-full"
                        setDate={(e) =>
                            setData("due_date", e?.toISOString() as any)
                        }
                    />
                    <InputError message={errors.due_date} />
                </div>
                <div className="space-y-1 flex-1">
                    <InputLabel value="Assign to" htmlFor="assigned_user_id" />
                    <AutoComplete
                        name="assigned_user_id"
                        placeholder="select user"
                        className="[&_svg]:hidden"
                        value={data.assigned_user_id?.toString()}
                        onValueChange={(e) =>
                            setData("assigned_user_id", Number(e))
                        }
                        options={users.map((opt) => ({
                            value: opt.id.toString(),
                            label: auth.user.id == opt.id ? "Me" : opt.name,
                        }))}
                    />
                    <InputError message={errors.assigned_user_id} />
                </div>
                <div className="space-y-1 flex-1">
                    <InputLabel
                        value="Assign to project"
                        htmlFor="project_id"
                    />
                    <AutoComplete
                        name="project_id"
                        placeholder="select project"
                        className="[&_svg]:hidden"
                        value={data.assigned_user_id?.toString()}
                        onValueChange={(e) => setData("project_id", Number(e))}
                        options={projects.map((opt) => ({
                            value: opt.id.toString(),
                            label: opt.name,
                        }))}
                    />
                    <InputError message={errors.assigned_user_id} />
                </div>
            </section>

            <Button type="submit">{task ? "Update" : "Add"}</Button>
        </form>
    );
};
