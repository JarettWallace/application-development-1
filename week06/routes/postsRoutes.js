const express = require("express");
const router = express.Router();
const controller = require("../controllers/postsController");

router.get("/", controller.getAllPosts);
router.get("/:id", controller.getPostById);
router.post("/", controller.createPost);
router.patch("/:id", controller.updatePost);
router.delete("/:id", controller.deletePost);

// Nested
router.get("/:postid/media-files", controller.getPostMediaFiles);

module.exports = router;
