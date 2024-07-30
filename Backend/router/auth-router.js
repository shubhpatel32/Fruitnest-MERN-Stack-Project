const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const schemas = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware");

router.route("/").get(authControllers.home);

router
  .route("/signup")
  .post(validate(schemas.signupSchema), authControllers.signup);

router
  .route("/login")
  .post(validate(schemas.loginSchema), authControllers.login);

router.route("/user").get(authMiddleware, authControllers.user);

module.exports = router;
