const Post = require("../models/Post");
// const User = require("../models/User");
const Comment = require("../models/Comment"); // Import the Comment model

// Create a new post
const createPost = async (req, res) => {
  try {
    const { content, type } = req.body;
    const userId = req.user._id; // Get the userId from the authenticated user

    // Validate request body
    if (!content || !type) {
      return res
        .status(400)
        .json({ message: "Content and type are required to create a post" });
    }

    // Create and save the post
    const post = new Post({
      content,
      type,
      user: userId,
    });
    await post.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.error("Error creating post:", error.message);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username") // Populate the user field with the username
      .populate("likes", "username")
      .populate("comments");
    // console.log('Fetched posts with populated user:', posts);
    res.status(200).json(posts);
  } catch (error) {
    console.error(error); // Debug log
    res.status(500).json({ message: "Server error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ message: `Post with ID ${postId} not found` });
    }

    // Check if the user is the owner of the post
    if (post.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
    }

    // Delete all comments associated with the post
    await Comment.deleteMany({ post: postId });

    // Delete the post
    await Post.findByIdAndDelete(postId);
    res
      .status(200)
      .json({ message: `Post with ID ${postId} deleted successfully` });
  } catch (error) {
    console.error(error); // Debug log
    res.status(500).json({ message: "Server error" });
  }
};

// Get a post by ID
const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;

    // Validate postId using a regular expression
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(postId);
    if (!isValidObjectId) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    // Fetch the post from the database
    const post = await Post.findById(postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Send the post details in the response
    return res.status(200).json({ post });
  } catch (error) {
    // Handle errors and send an appropriate response
    console.error("Error fetching post:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const updateById = async (req, res) => {
  try {
    const postId = req.params.id;
    
 const { content, type } = req.body;
    const userId = req.user._id; 
    // Validate request body
    if (!content || !type) {
      return res
        .status(400)
        .json({ message: "Content and type are required to create a post" });
    }
      
    // Validate postId
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(postId);
    if (!isValidObjectId) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    // Update the post
    const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {
      new: true,
      runValidators: true,
    });
  
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({ post: updatedPost });
  } catch (error) {
    console.error("Error updating post:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Like a post
const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ message: `Post with ID ${postId} not found` });
    }

    // Check if the post is already liked by the user
    if (post.likes.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already liked this post" });
    }

    // Add user to the likes array
    post.likes.push(userId);
    await post.save();

    res.status(200).json({ message: "Post liked successfully" });
  } catch (error) {
    console.error(error); // Debug log
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  deletePost,
  getPostById,
  updateById,
  likePost,
};
