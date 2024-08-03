const Blog = require("../models/blog-model");
const moment = require("moment");

const getBlog = async (req, res) => {
  try {
    const response = await Blog.find().sort({ date: -1 });

    if (!response) {
      res.status(404).json({ message: "No blog found" });
      return;
    }

    const formattedBlogs = response.map((blog) => ({
      ...blog.toObject(),
      date: moment(blog.date).format("Do MMM, YYYY"),
    }));

    res.status(200).json(formattedBlogs);
  } catch (error) {
    console.log(`Blogs: ${error}`);
  }
};

module.exports = getBlog;
