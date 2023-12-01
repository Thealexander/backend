"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const GroupMessagesSchema = new mongoose_1.default.Schema({
    group: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Groups",
        required: true,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["TEXT", "IMAGE"],
    },
}, {
    timestamps: true,
});
const GroupMessage = mongoose_1.default.model("GroupMessages", GroupMessagesSchema);
exports.default = GroupMessage;
//# sourceMappingURL=groupMessages.interface.js.map