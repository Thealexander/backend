import multer from "multer";
import path from "path";
import { Request } from "express";
import { v4 as uuid } from "uuid";

const storage = multer.diskStorage({
  destination: "./src/Uploads/profiles",
  filename: (req, file, cb): void => {
    //const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uuid() + path.extname(file.originalname));
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void => {
  // Solo permitir archivos de imagen
  const allowedMimes = ["image/jpeg", "image/pjpeg", "image/png", "image/gif"];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."));
    // const error = new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed.");
    //return next(error);
  }
};

const limits = {
  fileSize: 1024 * 1024 * 5, // 5MB límite de tamaño
};

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => fileFilter(req, file, cb),
  limits: limits,
});

export default upload;
