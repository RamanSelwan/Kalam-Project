import React, { useEffect, useState } from "react";
import { apiConnect } from "../../../src/api/apiConnect";
import { FaHeart, FaShare } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast"; // Import toast and Toaster

const Sher = () => {
  const [posts, setPosts] = useState([]);
  const [usernames, setUsernames] = useState({});
  const [error, setError] = useState("");
  const [likedPosts, setLikedPosts] = useState({});
  const [likeCounts, setLikeCounts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch posts
        const postResult = await apiConnect("api/posts", "GET");
        const shayariPosts = postResult.filter((post) => post.type === "Sher");
        setPosts(shayariPosts);

        // Fetch users
        const userResult = await apiConnect("api/users", "GET");
        const usernamesMap = userResult.reduce((acc, user) => {
          acc[user._id.toString()] = user.username || `User ID: ${user._id}`;
          return acc;
        }, {});
        setUsernames(usernamesMap);

        // Initialize like counts
        const initialLikeCounts = {};
        shayariPosts.forEach((post) => {
          initialLikeCounts[post._id] = post.likes.length;
        });
        setLikeCounts(initialLikeCounts);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again.");
      }
    };

    fetchData();
  }, []);

  const handleLike = async (postId) => {
    try {
      if (likedPosts[postId]) {
        // Show toast notification if the user has already liked the post
        toast("You have already liked this post!", {
          icon: "❤️",
          style: {
            background: "#333",
            color: "#fff",
          },
        });
        return; // Exit the function if the post is already liked
      }

      await apiConnect(`api/posts/${postId}/like`, "POST", {}); // Send an empty JSON body
      setLikedPosts((prevLikedPosts) => ({
        ...prevLikedPosts,
        [postId]: true,
      }));
      setLikeCounts((prevLikeCounts) => ({
        ...prevLikeCounts,
        [postId]: prevLikeCounts[postId] + 1,
      }));
    } catch (error) {
      console.error("Error liking post:", error);
      toast.error("Failed to like post. Please try again.");
    }
  };

  const handleShare = (post) => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      post.title + "\n" + post.content + "\n" + window.location.href
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">Sher</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {posts.length === 0 ? (
        <div className="text-center text-gray-600">
          No Sher posts available.
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-black p-6 rounded-lg shadow-lg w-full h-64 flex flex-col justify-center items-center"
            >
              <p className="text-white whitespace-pre-line text-center mb-4">
                {post.content}
              </p>
              <h3 className="text-gray-400 mb-2">
                Posted by:{" "}
                {usernames[post.user?.toString()] ||
                  `${post.user.username || "Unknown"}`}
              </h3>
              <div className="flex justify-center space-x-8 mt-4">
                <button
                  className={`flex items-center ${
                    likedPosts[post._id] ? "text-red-500" : "text-white"
                  } hover:text-red-700 transition-colors`}
                  onClick={() => handleLike(post._id)}
                >
                  <FaHeart className="mr-2" />{" "}
                  {likedPosts[post._id] ? "Liked" : "Like"}
                </button>
                <button
                  className="flex items-center text-white hover:text-blue-700 transition-colors"
                  onClick={() => handleShare(post)}
                >
                  <FaShare className="mr-2" /> Share
                </button>
              </div>
              <div className="text-white mt-2">
                {likeCounts[post._id]}{" "}
                {likeCounts[post._id] === 1 ? "Like" : "Likes"}
              </div>
            </div>
          ))}
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default Sher;
