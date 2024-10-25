import * as z from "zod";

export const formSchema = z.object({
  url: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .optional()
    .or(z.literal("")),
  jsonData: z.string().optional(),
  renderType: z.enum(["html", "markdown"]),
});
