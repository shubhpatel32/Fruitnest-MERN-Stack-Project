const { z } = require("zod");

const reviewSchema = z.object({
  review: z
    .string({ required_error: "Review is required" })
    .trim()
    .min(5, { message: "Review must contain at least of 5 characters" }),
});

module.exports = reviewSchema;
