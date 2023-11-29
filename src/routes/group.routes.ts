import { Router } from "express";
import { tokenValidation, upload } from "../middlewares";

import {
  createGroup,
  readsGroups,
  getGroupInfo,
  updateGroup,
  exitGroup,
  addParticipants,
  banParticipants,
  outOftheGroup,
} from "../controllers";

const router: Router = Router();

router.post(
  "/:groups",
  tokenValidation,
  upload.single("imgGroup"),
  createGroup
);
router.get("/", tokenValidation, readsGroups);
router.get("/usersExceptValidUsers/:groupId", tokenValidation, outOftheGroup);
router.patch("/ban", tokenValidation, banParticipants);
router.get("/:groupId", tokenValidation, getGroupInfo);
router.patch("/exit/:groupId", tokenValidation, exitGroup);
router.patch("/addparticipants/:groupId", tokenValidation, addParticipants);
router.patch(
  "/:groupId/:gpictures",
  tokenValidation,
  upload.single("imgGroup"),
  updateGroup
);

export default router;
