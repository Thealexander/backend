"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.post("/signup", controllers_1.signup);
router.post("/signin", controllers_1.signin);
router.get("/profile", middlewares_1.tokenValidation, controllers_1.profile);
router.post("/logout", middlewares_1.tokenValidation, controllers_1.logout);
router.get("/me", middlewares_1.tokenValidation, controllers_1.getMe);
router.patch("/me", middlewares_1.tokenValidation, middlewares_1.upload.single('avatar'), controllers_1.updateOwnProfile);
exports.default = router;
//# sourceMappingURL=auth.js.map