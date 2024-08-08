const { z } = require("zod");

const signupSchema = z.object({
  username: z
    .string({ required_error: "username is required" })
    .trim()
    .min(2, { message: "Username must contain at least of 2 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(2, { message: "Email must contain at least of 2 characters" }),

  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, {
      message: "Invalid phone number. It should contain exactly 10 digits.",
    })
    .max(10, {
      message: "Invalid phone number. It should contain exactly 10 digits.",
    }),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must contain at least of 6 characters" }),
});

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid Credentials" })
    .min(2, { message: "Email must contain at least of 2 characters" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Invalid Credentials" }),
});

module.exports = { signupSchema, loginSchema };
