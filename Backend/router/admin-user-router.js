const express = require("express");
const adminController = require("../controllers/admin-user-controller");
const router = express.Router();
const { authMiddleware } = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");
const { editUserSchema } = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");

router
  .route("/")
  .get(authMiddleware, adminMiddleware, adminController.getAllUsers);
router
  .route("/:id")
  .get(authMiddleware, adminMiddleware, adminController.getUserById);
router
  .route("/update/:id")
  .patch(
    authMiddleware,
    adminMiddleware,
    validate(editUserSchema),
    adminController.updateUserById
  );
router
  .route("/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteUserById);

module.exports = router;
