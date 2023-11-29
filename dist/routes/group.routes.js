"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post("/:groups", middlewares_1.tokenValidation, middlewares_1.upload.single("imgGroup"), controllers_1.createGroup);
router.get("/", middlewares_1.tokenValidation, controllers_1.readsGroups);
router.get("/usersExceptValidUsers/:groupId", middlewares_1.tokenValidation, controllers_1.outOftheGroup);
router.patch("/ban", middlewares_1.tokenValidation, controllers_1.banParticipants);
router.get("/:groupId", middlewares_1.tokenValidation, controllers_1.getGroupInfo);
router.patch("/exit/:groupId", middlewares_1.tokenValidation, controllers_1.exitGroup);
router.patch("/addparticipants/:groupId", middlewares_1.tokenValidation, controllers_1.addParticipants);
router.patch("/:groupId/:gpictures", middlewares_1.tokenValidation, middlewares_1.upload.single("imgGroup"), controllers_1.updateGroup);
exports.default = router;
//# sourceMappingURL=group.routes.js.map