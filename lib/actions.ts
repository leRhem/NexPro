"use server";

import { api } from "@/convex/_generated/api";
import { fetchMutation } from "convex/nextjs";
import { ConvexError } from "convex/values";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";
import { getToken } from "./auth-server";
import { postSchema } from "./schema/blog";

export async function createBlog(values: z.infer<typeof postSchema>) {
  try {
    const parsed = postSchema.safeParse(values);

    if (!parsed.success) {
      throw new ConvexError("Invalid input");
    }

    const token = await getToken();

    const imageUrl = await fetchMutation(
      api.posts.generateImageUrl,
      {},
      { token },
    );

    const uploadResult = await fetch(imageUrl, {
      method: "POST",
      headers: {
        "Content-Type": parsed.data.image.type,
      },
      body: parsed.data.image,
    });

    if (!uploadResult.ok) {
      return {
        error: "Failed to upload image",
      };
    }

    const { storageId } = await uploadResult.json();

    await fetchMutation(
      api.posts.createPost,
      {
        body: parsed.data.content,
        title: parsed.data.title,
        imageStorageId: storageId,
      },
      { token },
    );
  } catch {
    return {
      error: "Failed to create post",
    };
  }

  updateTag("blog");
  return redirect("/blog");
}
