import { Router } from "express";
import { tokenValidation } from "../middlewares";

import { createChat, readChats, deleteChat, readChat } from "../controllers";

const router: Router = Router();

router.post("/", tokenValidation, createChat);
router.get("/", tokenValidation, readChats);
router.delete("/:id", tokenValidation, deleteChat);
router.get("/:id", tokenValidation, readChat);

export default router;
