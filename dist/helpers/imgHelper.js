"use strict";
//import path from 'path';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilePath = void 0;
const getFilePath = (file) => {
    const filePath = file.path;
    const fileSplit = filePath.split("/");
    console.log("File path:", filePath);
    console.log("File split:", fileSplit);
    return `${fileSplit[1]}/${fileSplit[2]}`;
};
exports.getFilePath = getFilePath;
//# sourceMappingURL=imgHelper.js.map