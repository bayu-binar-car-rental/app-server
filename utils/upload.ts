import multer from "multer";
import path from "path";

const publicDir = path.join(__dirname, "..", "public");
const uploadDir = path.join(publicDir, "images");

// Define a way to upload image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() + 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

export default multer({ storage });
