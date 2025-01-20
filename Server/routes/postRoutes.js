const express = require("express");
const {
  createPost,
  getAllPosts,
  deletePost,
  updateById,
  getPostById,
  likePost,
} = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, createPost);
router.get("/", getAllPosts); // Public route
router.delete("/:id", protect, deletePost);
router.put("/:id", protect, updateById);

router.get("/:id ", getPostById);
router.post("/:id/like", protect, likePost); // Add this line

module.exports = router;
