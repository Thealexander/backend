import multer from "multer";
import path from "path";
import { Request } from "express";
import { v4 as uuid } from "uuid";

const eDir = (
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, destination: string) => void
): void => {
  const folder = req.params.folder || "images"; // Usar "profiles" como valor predeterminado si no se proporciona un parámetro de carpeta
  const destination = path.join(__dirname, "../Uploads", folder);
  cb(null, destination);
};

const storage = multer.diskStorage({
  destination: eDir, //path.join(__dirname, "src", "Uploads", "profiles"),
  filename: (req, file, cb): void => {
    cb(null, file.fieldname + "-" + uuid() + path.extname(file.originalname));
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void => {
  const allowedMimes = ["image/jpeg", "image/pjpeg", "image/png", "image/gif"];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."));
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
