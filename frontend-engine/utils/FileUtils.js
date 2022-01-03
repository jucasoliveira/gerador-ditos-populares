/* eslint-disable import/no-anonymous-default-export */
import path from "path";
import { readFileSync, readdirSync, lstatSync } from "fs";
import { ExtensionLanguages, Language } from "../types/languages.enum";
import Queue from "queue-fifo";

const getFileContents = (filepath) => {
  return readFileSync(filepath).toString();
};

const getFileExtension = (filepath) => {
  return path.extname(filepath);
};

const getLanguageByExtension = (fileExtension) => {
  return ExtensionLanguages.get(fileExtension);
};

const traverseDirectoryAndReturnListOfFiles = (rootDirPath) => {
  const directoriesToProcess = new Queue();
  const files = [];
  directoriesToProcess.enqueue(rootDirPath);
  while (!directoriesToProcess.isEmpty()) {
    // get all directories under current directory
    const currentDir = directoriesToProcess.dequeue();
    const paths = readdirSync(currentDir);
    paths.forEach(function (elemPath) {
      const fullElemPath = path.join(currentDir, elemPath);
      if (lstatSync(fullElemPath).isDirectory()) {
        directoriesToProcess.enqueue(fullElemPath);
      } else {
        files.push(fullElemPath);
      }
    });
  }
  return files;
};

export default {
  getFileContents,
  getFileExtension,
  getLanguageByExtension,
  traverseDirectoryAndReturnListOfFiles,
};
