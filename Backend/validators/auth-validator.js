const { z } = require("zod");

const signupSchema = z.object({
  username: z
    .string({ required_error: "username is required" })
    .trim()
    .min(2, { message: "Username must contain at least of 2 characters" })
    .max(25, { message: "username must not contain more than 25 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(2, { message: "Email must contain at least of 2 characters" })
    .max(25, { message: "Email must not contain more than 25 characters" }),

  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Invalid phone number" })
    .max(10, { message: "Invalid phone number" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must contain at least of 6 characters" })
    .max(1024, {
      message: "Password must not contain more than 1024 characters",
    }),
});

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid Credentials" })
    .min(2, { message: "Email must contain at least of 2 characters" })
    .max(25, { message: "Email must not contain more than 25 characters" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Invalid Credentials" })
    .max(1024, {
      message: "Invalid Credentials",
    }),
});

module.exports = { signupSchema, loginSchema };
