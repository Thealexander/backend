import { Router } from "express";
import { tokenValidation, upload } from "../middlewares";

import {
  createGroup,
  readsGroups,
  getGroupInfo,
  updateGroup,
  exitGroup,
} from "../controllers";

const router: Router = Router();

router.post(
  "/:groups",
  tokenValidation,
  upload.single("imgGroup"),
  createGroup
);
router.get("/", tokenValidation, readsGroups);
router.get("/:groupId", tokenValidation, getGroupInfo);
router.patch(
  "/:groupId/:groups",
  tokenValidation,
  upload.single("imgGroup"),
  updateGroup
);
router.patch("/exit/:groupId", tokenValidation, exitGroup);
export default router;
