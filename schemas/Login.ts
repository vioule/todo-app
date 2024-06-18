import { z } from "zod";

const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email address required" }),
  password: z.string().min(1, { message: "Password required" }),
});

export const SignupSchema = z
  .object({
    name: z.string().min(1, { message: "Name required" }),
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .min(1, { message: "Email address required" }),
    verifyEmail: z
      .string()
      .min(1, { message: "Verify email address required" }),
    password: z.string().min(1, { message: "Password required" }),
  })
  .refine((schema) => schema.email === schema.verifyEmail, {
    message: "Please enter the same email address",
    path: ["verifyEmail"],
  });

export const SignupAPISchema = z.object({
  name: z.string().min(1, { message: "Name required" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email address required" }),
  password: z.string().min(1, { message: "Password required" }),
});

export default LoginSchema;
