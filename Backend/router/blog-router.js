const express = require("express");
const router = express.Router();
const blogs = require("../controllers/blog-controller");

router.route("/data/blog").get(blogs);

module.exports = router;
