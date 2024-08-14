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

const addBlog = async (req, res) => {
  try {
    const { title, author, description } = req.body;
    const imagePath = req.file ? `SliderImages/${req.file.filename}` : "";

    const newBlog = new Blog({
      title,
      author,
      description,
      image: imagePath,
      date: new Date(),
    });

    await newBlog.save();

    res.status(201).json({ message: "Blog added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding blog" });
  }
};

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    console.log("Error in getting blog by id", error);
  }
};

const updateBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.log("Error in updating blog by id", error);
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
  addBlog,
  updateBlogById,
  getBlogById,
};
