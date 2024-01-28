import { z } from "sveltekit-api";
// import { posts, type Post } from "db";

export const Input = z.object({
    title: z.string(),
    content: z.string(),
    author: z.string(),
});

export const Output = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    author: z.string(),
    date: z.string(),
});

export default async function (input: z.infer<typeof Input>): Promise<z.infer<typeof Output>> {
    const id = Math.random().toString(36).substring(2);
    const date = new Date().toISOString();
    const post = { id, date, ...input };

    return post;
}
