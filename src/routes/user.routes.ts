import { Router } from "express";
import {
  deleteUser,
  readUser,
  readAllUsers,
  createUser,
  updateUser,

} from "../controllers";
import { tokenValidation } from "../middlewares";

const router = Router();

router.get("/", tokenValidation, readAllUsers);
router.get("/:_id", readUser);
router.post("/", tokenValidation, createUser);
router.put("/:_id", tokenValidation, updateUser);
router.delete("/:_id", tokenValidation, deleteUser);
export default router;
