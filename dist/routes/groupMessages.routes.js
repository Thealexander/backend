"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post("/", middlewares_1.tokenValidation, controllers_1.gsendTM);
router.post("/image/:images", middlewares_1.tokenValidation, middlewares_1.upload.single("image"), controllers_1.gsendIM);
router.get("/:group", middlewares_1.tokenValidation, controllers_1.ggetMessages);
router.get("/last/:group", middlewares_1.tokenValidation, controllers_1.glastMessage);
router.get("/total/:group", middlewares_1.tokenValidation, controllers_1.ggetTotalMessages);
exports.default = router;
//# sourceMappingURL=groupMessages.routes.js.map