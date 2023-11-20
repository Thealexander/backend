"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readChat = exports.deleteChat = exports.readChats = exports.createChat = exports.updateOwnProfile = exports.getMe = exports.deleteUser = exports.updateUser = exports.readAllUsers = exports.createUser = exports.readUser = exports.logout = exports.profile = exports.signup = exports.signin = void 0;
const auth_controller_1 = require("./auth.controller");
Object.defineProperty(exports, "signin", { enumerable: true, get: function () { return auth_controller_1.signin; } });
Object.defineProperty(exports, "signup", { enumerable: true, get: function () { return auth_controller_1.signup; } });
Object.defineProperty(exports, "profile", { enumerable: true, get: function () { return auth_controller_1.profile; } });
Object.defineProperty(exports, "logout", { enumerable: true, get: function () { return auth_controller_1.logout; } });
Object.defineProperty(exports, "getMe", { enumerable: true, get: function () { return auth_controller_1.getMe; } });
Object.defineProperty(exports, "updateOwnProfile", { enumerable: true, get: function () { return auth_controller_1.updateOwnProfile; } });
const users_controller_1 = require("./users.controller");
Object.defineProperty(exports, "readUser", { enumerable: true, get: function () { return users_controller_1.readUser; } });
Object.defineProperty(exports, "createUser", { enumerable: true, get: function () { return users_controller_1.createUser; } });
Object.defineProperty(exports, "readAllUsers", { enumerable: true, get: function () { return users_controller_1.readAllUsers; } });
Object.defineProperty(exports, "updateUser", { enumerable: true, get: function () { return users_controller_1.updateUser; } });
Object.defineProperty(exports, "deleteUser", { enumerable: true, get: function () { return users_controller_1.deleteUser; } });
const chat_controller_1 = require("./chat.controller");
Object.defineProperty(exports, "createChat", { enumerable: true, get: function () { return chat_controller_1.createChat; } });
Object.defineProperty(exports, "readChats", { enumerable: true, get: function () { return chat_controller_1.readChats; } });
Object.defineProperty(exports, "deleteChat", { enumerable: true, get: function () { return chat_controller_1.deleteChat; } });
Object.defineProperty(exports, "readChat", { enumerable: true, get: function () { return chat_controller_1.readChat; } });
//# sourceMappingURL=index.js.map