import { AvatarPicker } from "@/components/form/avatar-picker";
import { TextInput } from "@/components/form/text-input";
import { Button } from "@/components/ui/button";
import { PageProps } from "@/types";
import { Link, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const user = usePage<PageProps>().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            avatar: user?.avatar,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <section className="grid grid-cols-12 gap-4">
                    <div className="space-y-6 md:col-span-8">
                        <TextInput
                            label="Name"
                            name="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={setData}
                            error={errors.name}
                        />

                        <TextInput
                            label="Email"
                            name="email"
                            type="email"
                            className="mt-1 block w-full"
                            value={data.email}
                            onChange={setData}
                            error={errors.email}
                        />
                    </div>
                    <div className="col-span-4 flex items-center justify-center">
                        <AvatarPicker
                            defaultValue={data.avatar}
                            name="avatar"
                            onImageChange={(e) => setData("avatar", e)}
                        />
                    </div>
                </section>
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800 dark:text-gray-200">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

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
