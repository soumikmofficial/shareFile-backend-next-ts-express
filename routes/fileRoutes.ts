import express from "express";
import {
  uploadFile,
  getFile,
  downloadFile,
  emailDownloadLink,
} from "../controllers/fileController";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./tmp");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Math.round(Math.random() * 1e4);
    cb(null, file.originalname.split(".")[0] + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.route("/upload").post(upload.single("file"), uploadFile);
router.route("/:id").get(getFile);
router.route("/download/:id").get(downloadFile);
router.route("/email/:id").post(emailDownloadLink);

export default router;
