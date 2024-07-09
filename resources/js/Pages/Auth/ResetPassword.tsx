import { TextInput } from "@/components/form/text-input";
import { Button } from "@/components/ui/button";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect } from "react";

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.store"));
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <form onSubmit={submit}>
                <TextInput
                    error={errors.email}
                    label="Email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    onChange={setData}
                />

                <TextInput
                    type="password"
                    name="password"
                    value={data.password}
                    className="mt-4 block w-full"
                    label="Password"
                    error={errors.password}
                    onChange={setData}
                />

                <TextInput
                    type="password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    className="mt-4 block w-full"
                    label="Confirm Password"
                    error={errors.password_confirmation}
                    onChange={setData}
                />

                <div className="flex items-center justify-end mt-4">
                    <Button className="ms-4" disabled={processing}>
                        Reset Password
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
