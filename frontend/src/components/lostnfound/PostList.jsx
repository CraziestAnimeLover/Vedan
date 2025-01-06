import React, { useState } from "react";
import LostItemInput from "./LostItemInput";
import LostItemDisplay from "./LostItemDisplay";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  const handleAddPost = (post) => {
    setPosts([post, ...posts]); // Add new post at the top
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      {/* Input Section */}
      <div className="md:w-1/3">
        <LostItemInput onSubmit={handleAddPost} />
      </div>

      {/* Posts Section */}
      <div className="md:w-2/3">
        <h2 className="text-2xl font-bold mb-4">All Posts</h2>
        <div className="h-[80vh] overflow-y-auto space-y-4 bg-gray-100 p-4 rounded shadow">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <LostItemDisplay key={index} details={post} />
            ))
          ) : (
            <p className="text-gray-500 text-center">No posts yet. Add one!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostList;
