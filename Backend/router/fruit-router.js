const express = require("express");
const router = express.Router();
const fruits = require("../controllers/fruit-controller");

router.route("/data").get(fruits);

module.exports = router;
