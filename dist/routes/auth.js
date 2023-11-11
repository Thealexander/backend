"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validatetoken_1 = require("../middlewares/validatetoken");
const router = (0, express_1.Router)();
router.post('/signup', auth_controller_1.signup);
router.post('/signin', auth_controller_1.signin);
router.get('/profile', validatetoken_1.tokenValidation, auth_controller_1.profile);
router.post('/logout', validatetoken_1.tokenValidation, auth_controller_1.logout);
exports.default = router;
//# sourceMappingURL=auth.js.map