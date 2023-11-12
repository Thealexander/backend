"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
//import { tokenValidation } from "../middlewares/validatetoken";
const router = (0, express_1.Router)();
router.get("/", users_controller_1.readAllUsers);
router.get("/:_id", users_controller_1.readUser);
router.post("/", users_controller_1.createUser); // no usar
router.put("/:_id", users_controller_1.updateUser);
router.delete("/:_id", users_controller_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.js.map