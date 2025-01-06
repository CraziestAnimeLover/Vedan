import React, { useState } from "react";

const LostItemDisplay = ({ details }) => {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden h-100vh">
      {/* Image */}
      {details.image && (
        <img
          src={details.image}
          alt="Item"
          className="w-full h-64 object-cover"
        />
      )}

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{details.name}</h3>
        <p className="text-gray-700 text-sm">{details.description}</p>
        <p className="text-gray-500 text-xs mt-2">
          <strong>Reported by:</strong> {details.fullName}
        </p>
        <p className="text-gray-500 text-xs mt-1">
          <strong>Last Seen:</strong> {details.location}
        </p>
        <p className="text-gray-500 text-xs">
          <strong>Contact:</strong> {details.contactInfo}
        </p>
      </div>

      {/* Actions */}
      <div className="px-4 py-2 flex items-center justify-between border-t">
        <button
          onClick={handleLike}
          className="text-gray-500 hover:text-red-500 flex items-center space-x-2"
        >
          <span>❤️</span>
          <span>{likes} Likes</span>
        </button>
      </div>

      {/* Comments */}
      <div className="p-4">
        <h4 className="text-gray-800 font-semibold text-sm mb-2">Comments</h4>
        {comments.length > 0 ? (
          <ul className="space-y-2">
            {comments.map((comment, index) => (
              <li
                key={index}
                className="text-gray-700 text-sm border-b pb-1"
              >
                {comment}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No comments yet.</p>
        )}

        {/* Comment Input */}
        <form onSubmit={handleCommentSubmit} className="mt-4 flex space-x-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a comment..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default LostItemDisplay;
