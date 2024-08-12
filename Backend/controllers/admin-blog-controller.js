const Blog = require("../models/blog-model");
const moment = require("moment");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ date: -1 });
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found" });
    }
    const formattedBlogs = blogs.map((blog) => ({
      ...blog.toObject(),
      date: moment(blog.date).format("Do MMM, YYYY"),
    }));

    res.status(200).json(formattedBlogs);
  } catch (error) {
    console.log("Error in getting blogs", error);
  }
};

const deleteBlogById = async (req, res) => {
  try {
    const id = req.params.id;
    await Blog.deleteOne({ _id: id });
    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.log("Error in deleting blog by ID", error);
  }
};

module.exports = {
  getAllBlogs,
  deleteBlogById,
};
