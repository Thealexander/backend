import { Router } from "express";
import {
  signin,
  signup,
  profile,
  logout,
  getMe,
  updateOwnProfile,
} from "../controllers";
import { tokenValidation, upload } from "../middlewares";

const router: Router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile", tokenValidation, profile);
router.post("/logout", tokenValidation, logout);
router.get("/me", tokenValidation, getMe);
router.patch("/me", tokenValidation,upload.single('avatar'), updateOwnProfile);

export default router;
