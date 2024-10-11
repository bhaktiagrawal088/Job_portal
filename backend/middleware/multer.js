import multer from "multer";

// Step 1: Use memory storage
const storage = multer.memoryStorage();

// Step 2: Create a Multer instance
const upload = multer({ storage });

// Step 3: Export the singleUpload middleware
export const singleUpload = upload.single("file");

