import { z } from "zod";

export const CreateTaskSchema = z.object({
  title: z.string().min(1, { message: "Title required" }),
  description: z.string().min(1, { message: "Description required" }),
});
