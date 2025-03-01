import React, { useState } from "react";
import { FaTrash, FaPlus, FaUpload, FaFilePdf } from "react-icons/fa";

const News = () => {
  const [newsList, setNewsList] = useState([
    { id: 1, date: "", event: "", description: null, source: "" },
  ]);

  // Add News Row
  const addNews = () => {
    setNewsList([
      ...newsList,
      { id: newsList.length + 1, date: "", event: "", description: null, source: "" },
    ]);
  };

  // Remove News Row
  const removeNews = (id) => {
    setNewsList(newsList.filter((news) => news.id !== id));
  };

  // Handle Input Change
  const handleInputChange = (id, field, value) => {
    setNewsList(
      newsList.map((news) =>
        news.id === id ? { ...news, [field]: value } : news
      )
    );
  };

  // Handle PDF Upload
  const handlePdfUpload = (id, file) => {
    setNewsList(
      newsList.map((news) =>
        news.id === id ? { ...news, description: file } : news
      )
    );
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4">NEV (News & Events)</h3>

      {/* Add News Button */}
      <button
        onClick={addNews}
        className="mb-4 flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
      >
        <FaPlus className="mr-2" /> Add News
      </button>

      {/* News Table */}
      <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border px-4 py-2">Sr. No.</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">News/Events</th>
            <th className="border px-4 py-2">Description (PDF)</th>
            <th className="border px-4 py-2">Source</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {newsList.map((news, index) => (
            <tr key={news.id}>
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2">
                <input
                  type="date"
                  value={news.date}
                  onChange={(e) => handleInputChange(news.id, "date", e.target.value)}
                  className="w-full p-1 border border-gray-300 rounded-md"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={news.event}
                  onChange={(e) => handleInputChange(news.id, "event", e.target.value)}
                  className="w-full p-1 border border-gray-300 rounded-md"
                />
              </td>
              {/* PDF Upload & Preview */}
              <td className="border px-4 py-2 text-center">
                <label className="cursor-pointer text-red-600 hover:text-red-800 flex items-center justify-center">
                  <FaFilePdf className="mr-1" /> Upload PDF
                  <input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => handlePdfUpload(news.id, e.target.files[0])}
                  />
                </label>
                {news.description && (
                  <div className="mt-2">
                    <a
                      href={URL.createObjectURL(news.description)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline flex items-center"
                    >
                      <FaFilePdf className="mr-1" /> View PDF
                    </a>
                  </div>
                )}
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={news.source}
                  onChange={(e) => handleInputChange(news.id, "source", e.target.value)}
                  className="w-full p-1 border border-gray-300 rounded-md"
                />
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => removeNews(news.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default News;
