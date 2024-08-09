const { z } = require("zod");

const reviewSchema = z.object({
  username: z
    .string({ required_error: "username is required" })
    .trim()
    .min(2, { message: "Username must contain at least of 2 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(2, { message: "Email must contain at least of 2 characters" }),

  review: z
    .string({ required_error: "Review is required" })
    .trim()
    .min(5, { message: "Review must contain at least of 5 characters" }),
});

module.exports = reviewSchema;
