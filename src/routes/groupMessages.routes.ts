import { Router } from "express";
import { tokenValidation, upload } from "../middlewares";

import {
  gsendIM,
  gsendTM,
  ggetMessages,
  ggetTotalMessages,
  glastMessage,
} from "../controllers";

const router: Router = Router();

router.post("/", tokenValidation, gsendTM);
router.post("/image/:images", tokenValidation, upload.single("image"), gsendIM);
router.get("/:group", tokenValidation, ggetMessages);
router.get("/last/:group", tokenValidation, glastMessage);
router.get("/total/:group", tokenValidation, ggetTotalMessages);

export default router;
