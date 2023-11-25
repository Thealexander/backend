import { Router } from "express";
import { tokenValidation, upload } from "../middlewares";

import { sendIM, sendTM, getMessages, getTotalMessages,lastMessage } from "../controllers";

const router: Router = Router();

router.post("/", tokenValidation, sendTM);
router.post("/image/:images", tokenValidation, upload.single("image"), sendIM);
router.get("/:chat", tokenValidation, getMessages);
router.get('/last/:chat', tokenValidation, lastMessage)
router.get("/total/:chat", tokenValidation, getTotalMessages);
export default router;
