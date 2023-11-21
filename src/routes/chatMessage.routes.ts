import { Router } from "express";
import { tokenValidation, upload } from "../middlewares";

import {sendCMessage} from '../controllers'

const router: Router = Router();

router.post("/chats/message", tokenValidation, sendCMessage);

export default router;