import { Router  } from "express";
import { tokenValidation } from "../middlewares";

import {createChat} from '../controllers'

const router: Router = Router();

router.post("/", tokenValidation, createChat);


export default router;
