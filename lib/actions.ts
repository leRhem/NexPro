"use server";

import z from "zod";
import { postSchema } from "./schema/blog";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { ConvexError } from "convex/values";
import { getToken } from "./auth-server";

export async function createBlog(values: z.infer<typeof postSchema>) {
     const parsed = postSchema.safeParse(values);

     if(!parsed.success) {
        throw new ConvexError("Invalid input");
     }

     const token = await getToken()

     await fetchMutation(
        api.posts.createPost, 
        {
           body: parsed.data.content,
           title: parsed.data.title,
        }, 
        { token }
    );

     return redirect("/blog");
}