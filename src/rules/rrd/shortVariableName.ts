import { SFCScriptBlock } from "@vue/compiler-sfc";
import { BG_RESET, BG_WARN, TEXT_WARN, TEXT_RESET, TEXT_INFO } from "../asceeCodes";

type ShortVariableNameFile = {
  filename: string;
  variable: string;
};

const MIN_VARIABLE_NAME = 4;

const shortVariableNameFile: ShortVariableNameFile[] = [];

// Helper function to count non duplicated objects
const getUniqueFilenameCount = (arr: ShortVariableNameFile[]) => {
  const uniqueFilenames = new Set(arr.map((item) => item.filename));
  return uniqueFilenames.size;
};

const checkShortVariableName = (script: SFCScriptBlock, filePath: string) => {
  // Regular expression to match variable names
  const regex = /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g;

  const matches = script.content.match(regex);

  if (matches) {
    matches.forEach((variable) => {
      if (variable.length < MIN_VARIABLE_NAME) {
        shortVariableNameFile.push({ filename: filePath, variable });
      }
    });
  }
};

const reportShortVariableName = () => {
  if (shortVariableNameFile.length > 0) {
    // Count only non duplicated objects (by its `filename` property)
    // i.e if three variables have short name from the same file, it will only count as 1 file
    // and not as 3 files
    const fileCount = getUniqueFilenameCount(shortVariableNameFile);

    console.log(
      `\n${TEXT_INFO}rrd${TEXT_RESET} ${BG_WARN}variable name${BG_RESET} too short in ${fileCount} files.`
    );
    console.log(
      `👉 ${TEXT_WARN}Variables name must be minimum ${MIN_VARIABLE_NAME} chars${TEXT_RESET}`
    );
    shortVariableNameFile.forEach((file) => {
      console.log(`- ${file.filename} 🚨 ${BG_WARN}(${file.variable})${BG_RESET}`);
    });
  }
  return shortVariableNameFile.length;
};

export { checkShortVariableName, reportShortVariableName };
