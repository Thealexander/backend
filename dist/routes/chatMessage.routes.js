"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post("/", middlewares_1.tokenValidation, controllers_1.sendTM);
router.post("/image/:images", middlewares_1.tokenValidation, middlewares_1.upload.single("image"), controllers_1.sendIM);
router.get("/:chat", middlewares_1.tokenValidation, controllers_1.getMessages);
router.get('/last/:chat', middlewares_1.tokenValidation, controllers_1.lastMessage);
router.get("/total/:chat", middlewares_1.tokenValidation, controllers_1.getTotalMessages);
exports.default = router;
//# sourceMappingURL=chatMessage.routes.js.map