"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post("/", middlewares_1.tokenValidation, controllers_1.createChat);
router.get("/", middlewares_1.tokenValidation, controllers_1.readChats);
router.delete("/:id", middlewares_1.tokenValidation, controllers_1.deleteChat);
router.get("/:id", middlewares_1.tokenValidation, controllers_1.readChat);
exports.default = router;
//# sourceMappingURL=chat.routes.js.map