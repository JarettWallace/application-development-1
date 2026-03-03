const express = require("express");
const router = express.Router();
const controller = require("../controllers/categoriesController");

router.get("/", controller.getAllCategories);
router.get("/:id", controller.getCategoryById);
router.post("/", controller.createCategory);
router.patch("/:id", controller.updateCategory);
router.delete("/:id", controller.deleteCategory);

// Nested
router.get("/:categoryid/posts", controller.getPostsByCategory);

module.exports = router;
