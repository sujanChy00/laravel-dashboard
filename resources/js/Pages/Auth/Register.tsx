import GuestLayout from "@/Layouts/GuestLayout";
import { AvatarPicker } from "@/components/form/avatar-picker";
import { TextInput } from "@/components/form/text-input";
import { Button } from "@/components/ui/button";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect } from "react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        avatar: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <AvatarPicker
                    name="avatar"
                    className="mx-auto"
                    onImageChange={(img) => setData("avatar", img)}
                />

                <TextInput
                    label="Name"
                    error={errors.name}
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    onChange={setData}
                />

                <TextInput
                    label="Email"
                    error={errors.email}
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-4 block w-full"
                    onChange={setData}
                />

                <TextInput
                    label="Password"
                    type="password"
                    error={errors.password}
                    name="password"
                    value={data.password}
                    className="mt-4 block w-full"
                    onChange={setData}
                />

                <TextInput
                    label="Confirm Password"
                    type="password"
                    error={errors.password_confirmation}
                    name="password_confirmation"
                    value={data.password_confirmation}
                    className="mt-4 block w-full"
                    onChange={setData}
                />

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route("login")}
                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                        Already registered?
                    </Link>

                    <Button className="ms-4" disabled={processing}>
                        Register
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
