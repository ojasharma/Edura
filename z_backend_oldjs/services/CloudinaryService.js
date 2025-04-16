const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const https = require("https");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const tempDir = path.join(process.cwd(), "temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

class CloudinaryService {
  constructor() {
    this.upload = multer({ storage: storage });
  }

  static async uploadVideo(file) {
    try {
      console.log("Starting Cloudinary upload for:", file.path);

      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          file.path,
          {
            resource_type: "video",
            folder: "course-videos",
            eager: [
              // Add eager transformation for thumbnail
              { width: 320, height: 180, crop: "fill", format: "jpg" },
            ],
            eager_async: false,
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload failed:", error);
              reject(error);
              return;
            }

            console.log("Cloudinary upload successful:", result);
            resolve({
              url: result.secure_url,
              public_id: result.public_id,
              duration: result.duration || 0,
              thumbnailUrl:
                result.eager && result.eager[0]
                  ? result.eager[0].secure_url
                  : null,
            });
          }
        );
      });
    } catch (error) {
      console.error("Upload error:", error);
      throw new Error(`Failed to upload video to Cloudinary: ${error.message}`);
    }
  }

  static async deleteVideo(publicId) {
    try {
      await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
      // Also delete the thumbnail if it exists
      await cloudinary.uploader.destroy(`${publicId}.jpg`);
    } catch (error) {
      console.error("Cloudinary delete error:", error);
      throw new Error("Failed to delete video from Cloudinary");
    }
  }

  static getPublicIdFromUrl(url) {
    const splits = url.split("/");
    const publicIdWithExtension = splits[splits.length - 1];
    return publicIdWithExtension.split(".")[0];
  }

  static async cleanup(filePath) {
    try {
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
        console.log("Temporary file cleaned up:", filePath);
      }
    } catch (error) {
      console.error("Failed to cleanup temporary file:", error);
    }
  }
}

module.exports = CloudinaryService;
