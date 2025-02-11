import React, { useState } from "react"; 

const CustomCard = () => {
  const [file, setFile] = useState(null);

  // Handle file upload
  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(URL.createObjectURL(uploadedFile)); // Create an object URL for the uploaded file
      console.log(uploadedFile);
    }
  };

  return (
    <div
      className="bg-[#20354b] p-8 rounded-lg shadow-lg w-64 h-64 flex flex-col items-center justify-center relative"
    >
      {/* Styled 'व' with inline style */}
      <div
        style={{
          fontSize: "18rem", // Adjust text size here
          fontWeight: "",
          letterSpacing: "2px",
          color: "white",
          position: "relative",
        }}
      >
        व
        {/* Circular Image inside व */}
        <div
          style={{
            position: "absolute",
            inset: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => document.getElementById("fileInput").click()} // Trigger file input click
        >
          {file ? (
            <img
              src={file}
              alt=""
              style={{
                width: "89px",
                height: "89px",
                marginTop: "42px",
                marginRight: "8px",
                borderRadius: "50%",
                border: "4px solid white",
              }}
            />
          ) : (
            <div
              style={{
                width: "85px",
                height: "85px",
                marginTop: "42px",
                marginRight: "8px",
                borderRadius: "50%",
                backgroundColor: "#ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "4px solid white",
              }}
            >
              +
            </div>
          )}
        </div>
        {/* Hidden file input */}
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default CustomCard;
