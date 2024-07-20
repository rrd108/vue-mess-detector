import { SFCScriptBlock } from "@vue/compiler-sfc";
import { BG_RESET, BG_WARN, TEXT_WARN, TEXT_RESET, TEXT_INFO } from "../asceeCodes";
import { getUniqueFilenameCount } from "../../helpers";

type ShortVariableNameFile = {
  filename: string;
  variable: string;
};

const MIN_VARIABLE_NAME = 4; // completely rrd made-up number

const shortVariableNameFile: ShortVariableNameFile[] = [];

const checkShortVariableName = (script: SFCScriptBlock, filePath: string) => {
  // Regular expression to match variable names
  const regex = /\b(?:const|var|let)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;

  let match;
  while ((match = regex.exec(script.content)) !== null) {
    const variable = match[1];

    if (variable.length < MIN_VARIABLE_NAME) {
      shortVariableNameFile.push({ filename: filePath, variable });
    }
  }
};

const reportShortVariableName = () => {
  if (shortVariableNameFile.length > 0) {
    // Count only non duplicated objects (by its `filename` property)
    const fileCount = getUniqueFilenameCount<ShortVariableNameFile>(shortVariableNameFile, "filename");

    console.log(
      `\n${TEXT_INFO}rrd${TEXT_RESET} ${BG_WARN}variable names${BG_RESET} are too short in ${fileCount} files.`
    );
    console.log(
      `👉 ${TEXT_WARN}Variable names must have a minimum length of ${MIN_VARIABLE_NAME}${TEXT_RESET}`
    );
    shortVariableNameFile.forEach((file) => {
      console.log(`- ${file.filename} 🚨 ${BG_WARN}(${file.variable})${BG_RESET}`);
    });
  }
  return shortVariableNameFile.length;
};

export { checkShortVariableName, reportShortVariableName };
