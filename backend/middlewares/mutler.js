import multer from "multer";
import path from "path";

// Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the folder to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename based on timestamp
  },
});

// File Filter to Accept Only Images (JPG, JPEG, PNG)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);

  if (extName && mimeType) {
    return cb(null, true); // Accept the file
  } else {
    return cb(new Error("Only images (JPG, JPEG, PNG) are allowed!")); // Reject the file if not allowed
  }
};

// Single File Upload (for an image, for example)
export const singleUpload = multer({ storage, fileFilter }).single("image"); // Ensure "image" matches frontend

// Multiple File Upload (for fields like 'pic' and 'description')
export const uploadFiles = multer({ storage, fileFilter }).fields([
  { name: "pic", maxCount: 1 },        // File field for images
  { name: "description", maxCount: 1 }, // File field for PDF or description
]);
