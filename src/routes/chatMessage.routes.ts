import { Router } from "express";
import { tokenValidation, upload } from "../middlewares";

import { sendIM, sendTM, getMessages } from "../controllers";

const router: Router = Router();

router.post("/", tokenValidation, sendTM);
router.post("/image/:images", tokenValidation, upload.single("image"), sendIM);
router.get("/:chat", tokenValidation, getMessages);
export default router;
