import React, { useEffect, useState } from "react";
import { apiConnect } from "../../../api/apiConnect";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";

const YourAllPost = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [isShow, setIsshow] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null); // Post being edited

  // Get current user ID from local storage
  const getCurrentUserId = () => localStorage.getItem("userId");
  const currentUserId = getCurrentUserId();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await apiConnect("api/posts", "GET");
        if (!result) {
          throw new Error("Posts not found in the response");
        }

        const userPosts = result.filter(
          (post) => post.user?._id === currentUserId
        );
        setPosts(userPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to fetch posts. Please try again.");
      }
    };

    fetchPosts();
  }, [currentUserId]);

  // Function to handle post update
  const handleEdit = async (post) => {
    setPostToEdit(post);
    setIsshow(true); // Show the modal for editing
  };

  // Function to update the post
  const handleUpdatePost = async (content, type) => {
    if (!content || !type) {
      toast.error("Both content and category are required!");
      return;
    }

    const postId = postToEdit._id; // Get the post ID to be updated
    console.log("Updating Post:", { content, type, postId });

    try {
      const result = await apiConnect(`api/posts/${postId}`, "PUT", {
        content, // Content of the post
        type, // Category of the post
      });

      console.log("Result received:", result); // Log the full response

      // Handle successful update
      if (result && result.post) {
        toast.success("Post Updated Successfully");
        setPosts(
          posts.map((post) => (post._id === postId ? result.post : post))
        );
        setIsshow(false); // Close the modal after updating
      } else {
        toast.error("Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      setError("Failed to update the post. Please try again.");
    }
  };

  // Function to handle post deletion
  const handleDelete = async (postId) => {
    try {
      await apiConnect(`api/posts/${postId}`, "DELETE");
      setPosts(posts.filter((post) => post._id !== postId));
      toast.success("Post Deleted Successfully");
    } catch (error) {
      console.error("Error deleting post:", error);
      setError("Failed to delete the post. Please try again.");
    }
  };

  return (
    <div className="p-6 font-hinditext">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Your Posts</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {posts.length === 0 ? (
        <div className="text-gray-500">No posts available.</div>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li
              key={post._id}
              className="p-6 border border-blue-300 bg-blue-50 rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="flex-1">
                  <h2
                    className="text-2xl font-hinditext text-blue-800 mb-3"
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {post.content}
                  </h2>
                </div>
                <div className="flex space-x-3 mt-4 sm:mt-0">
                  <button
                    onClick={() => handleEdit(post)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      
      {isShow && postToEdit && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setIsshow(false)} // Close modal on outside click
        >
          <div
            className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()} // Prevent close on clicking inside
          >
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Edit Post</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdatePost(
                  e.target.content.value,
                  e.target.category.value
                );
              }}
            >
              <div className="mb-4">
                <label
                  htmlFor="content"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Write Up
                </label>
                <textarea
                  id="content"
                  name="content"
                  defaultValue={postToEdit.content}
                  rows="5"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  defaultValue={postToEdit.category}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                >
                  <option value="Sher">Sher</option>
                  <option value="Shayari">Shayari</option>
                  <option value="Poetry">Poetry</option>
                  <option value="Quote">Quote</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Update Post
              </button>
            </form>
          </div>
        </div>
      )}

      <Toaster />
    </div>
  );
};

export default YourAllPost;
