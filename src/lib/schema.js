import * as z from "zod";

export const formSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL" }).optional(),
  jsonData: z
    .string()
    .min(2, { message: "JSON data must be at least 2 characters" }),
  renderType: z.enum(["html", "markdown"]),
});
