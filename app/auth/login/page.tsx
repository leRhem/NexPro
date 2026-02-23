"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { loginSchema } from "@/lib/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function Login() {
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit( data: z.infer<typeof loginSchema>) {
        await authClient.signIn.email({
            email: data.email,
            password: data.password,

            fetchOptions: {
                onSuccess: () => {
                    toast.success("Logged in successfully");
                    router.push("/");
                }
            }
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl text-center">Welcome back!</CardTitle>
                <CardDescription className="text-center">Sign in to continue</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup className="gap-y-4">
                        <Controller 
                            name="email" 
                            control={form.control} 
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Email</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="exapmle@gmail.com" type="email" {...field} />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )} 
                        />
                        <Controller 
                            name="password" 
                            control={form.control} 
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Password</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="Password" type="password" {...field} />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )} 
                        />
                        <Button className="mt-5">Login</Button>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}