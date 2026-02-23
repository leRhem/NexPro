import z, { email } from "zod";

export const signUpSchema = z.object({
    name: z.string().min(3).max(50),
    email: z.email(),
    password: z.string().min(8).max(32)
})

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8).max(32)
})