
import React from "react";

const EnquiryCard = ({ title, description, status, priority, timestamp, onAction, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
      {/* Title Section */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <span
          className={`px-2 py-1 text-xs font-semibold rounded ${
            status === "Open"
              ? "bg-green-100 text-green-600"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 mt-2">{description}</p>

      {/* Priority and Timestamp */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <span className={`font-medium ${priority === "High" ? "text-red-600" : "text-gray-600"}`}>
          Priority: {priority}
        </span>
        <span>{timestamp}</span>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-4 gap-2">
        {onAction && (
          <button
            onClick={onAction}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Resolve
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default EnquiryCard;
