import { TextInput } from "@/components/form/text-input";
import { Button } from "@/components/ui/button";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect } from "react";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.confirm"));
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                This is a secure area of the application. Please confirm your
                password before continuing.
            </div>

            <form onSubmit={submit}>
                <div className="mt-4">
                    <TextInput
                        type="password"
                        name="password"
                        label="Password"
                        error={errors.password}
                        value={data.password}
                        className="mt-1 block w-full"
                        onChange={setData}
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button className="ms-4" disabled={processing}>
                        Confirm
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
