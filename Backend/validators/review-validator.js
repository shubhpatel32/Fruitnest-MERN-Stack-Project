const { z } = require("zod");

const reviewSchema = z.object({
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

  review: z
    .string({ required_error: "Review is required" })
    .trim()
    .min(10, { message: "Review must contain at least of 10 characters" })
    .max(200, { message: "Review must not contain more than 200 characters" }),
});

module.exports = reviewSchema;
