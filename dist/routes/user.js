"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const router = (0, express_1.Router)();
router.get("/", users_controller_1.getUsuarios);
router.get("/:id", users_controller_1.getUsuario);
router.post("/", users_controller_1.postUsuario);
router.put("/:id", users_controller_1.putUsuario);
router.delete("/:id", users_controller_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=user.js.map