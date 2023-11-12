import { Router } from "express";
import {
  deleteUser,
  readUser,
  readAllUsers,
  createUser,
  updateUser,
} from "../controllers/users.controller";
//import { tokenValidation } from "../middlewares/validatetoken";

const router = Router();

router.get("/", readAllUsers);
router.get("/:_id", readUser);
router.post("/", createUser);// no usar
router.put("/:_id", updateUser);
router.delete("/:_id", deleteUser);

export default router;
