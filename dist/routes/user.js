"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get("/", middlewares_1.tokenValidation, controllers_1.readAllUsers);
router.get("/:_id", middlewares_1.tokenValidation, controllers_1.readUser);
router.post("/", middlewares_1.tokenValidation, controllers_1.createUser);
router.put("/:_id", middlewares_1.tokenValidation, controllers_1.updateUser);
router.delete("/:_id", middlewares_1.tokenValidation, controllers_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.js.map