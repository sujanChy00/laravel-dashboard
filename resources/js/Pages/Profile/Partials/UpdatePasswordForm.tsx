import InputLabel from "@/components/form/InputLabel";
import { TextInput } from "@/components/form/text-input";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useRef } from "react";

export default function UpdatePasswordForm({
    className = "",
}: {
    className?: string;
}) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Update Password
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Ensure your account is using a long, random password to stay
                    secure.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <TextInput
                    label="Confirm Password"
                    name="current_password"
                    value={data.current_password}
                    onChange={setData}
                    type="password"
                    error={errors.current_password}
                    className="mt-1 block w-full"
                />

                <TextInput
                    label="New Password"
                    name="password"
                    value={data.password}
                    onChange={setData}
                    type="password"
                    className="mt-1 block w-full"
                />

                <InputLabel
                    htmlFor="password_confirmation"
                    value="Confirm Password"
                />

                <TextInput
                    label="Confirm Password"
                    error={errors.password_confirmation}
                    name="password_confirmation"
                    value={data.password_confirmation}
                    onChange={setData}
                    type="password"
                    className="mt-1 block w-full"
                />

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Save</Button>

                    {recentlySuccessful && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 animate-in">
                            Saved.
                        </p>
                    )}
                </div>
            </form>
        </section>
    );
}
