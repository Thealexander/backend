"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post("/:groups", middlewares_1.tokenValidation, middlewares_1.upload.single("imgGroup"), controllers_1.createGroup);
router.get("/", middlewares_1.tokenValidation, controllers_1.readsGroups);
router.get("/:groupId", middlewares_1.tokenValidation, controllers_1.getGroupInfo);
router.patch("/:groupId/:groups", middlewares_1.tokenValidation, middlewares_1.upload.single("imgGroup"), controllers_1.updateGroup);
router.patch("/exit/:groupId", middlewares_1.tokenValidation, controllers_1.exitGroup);
exports.default = router;
//# sourceMappingURL=group.routes.js.map