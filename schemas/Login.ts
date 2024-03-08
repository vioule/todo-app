import { z } from "zod";

const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email address required" }),
  password: z.string().min(1, { message: "Password required" }),
});

export default LoginSchema;
