//import path from 'path';

export const getFilePath = (file: Express.Multer.File) => {
  const filePath = file.path;
  const fileSplit = filePath.split("/");

  console.log("File path:", filePath);
  console.log("File split:", fileSplit);

  return `${fileSplit[1]}/${fileSplit[2]}`;
};
