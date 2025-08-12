import multer from "multer";
import fs from "fs";
import path from "path";
import {
  getChannel,
  addChannelContent,
  createChannel,
  deleteVideo,
  updateVideo,
} from "../controller/channel.controller.js";   // Importing channel-related controller functions

// Define upload folder path
const uploadPath = "./uploads";
// If the upload directory does not exist, create it recursively
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  // Set destination folder for uploaded files
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  // Set a unique filename for uploaded files to avoid name conflicts
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension); // unique file name for different files
  },
});
// Initialize multer with the defined storage settings
const upload = multer({ storage: storage });

// Function to define channel-related API routes
export const channelRoutes = (app) => {
  app.get("/channel", getChannel);
  app.post("/create-channel", upload.single("userImg"), createChannel);
  app.post(
    "/channel",
    upload.fields([
      {
        name: "banner-img",
        maxCount: 1,
      },
      {
        name: "video",
        maxCount: 1,
      },
      {
        name: "thumbnail",
        maxCount: 1,
      },
    ]),
    addChannelContent
  );
  app.put(
    "/channel",
    upload.fields([
      {
        name: "thumbnail",
        maxCount: 1,
      },
    ]),
    updateVideo
  );
  app.delete("/channel", deleteVideo);
};
