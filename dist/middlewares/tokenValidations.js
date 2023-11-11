"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenInvalid = exports.removeFromInvalidTokens = exports.addToInvalidTokens = void 0;
const invalidTokens = new Set();
const addToInvalidTokens = (token) => {
    invalidTokens.add(token);
};
exports.addToInvalidTokens = addToInvalidTokens;
const removeFromInvalidTokens = (token) => {
    invalidTokens.delete(token);
};
exports.removeFromInvalidTokens = removeFromInvalidTokens;
const isTokenInvalid = (token) => {
    return invalidTokens.has(token);
};
exports.isTokenInvalid = isTokenInvalid;
//# sourceMappingURL=tokenValidations.js.map