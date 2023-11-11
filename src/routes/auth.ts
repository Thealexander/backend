import { Router } from "express";
import {
    signin,
    signup,
    profile,
    logout,
} from "../controllers/auth.controller";
import { tokenValidation } from "../middlewares/validatetoken";

const router: Router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile',tokenValidation, profile);
router.post('/logout', logout);

export default router;