import path from "path";
import chalk from "chalk";

const sep = path.sep;

const colors = {
  ts: chalk.blue,
  js: chalk.yellow,
};

const getLineFromStack = (stack: string) => {
  const lines = stack.split("\n");
  const lineString = lines[3];
  let match = lineString.match(/at .*? \((.*)\)/);

  // Try other match
  if (!match) {
    match = lineString.match(/at (.*)/);
  }

  // Failure
  if (!match) {
    return "";
  }

  // Get file and line
  const file = match[1];
  const segments = file.split(sep);
  return segments[segments.length - 1];
};

export const getColoredLine = () => {
  try {
    throw new Error();
  } catch (err) {
    const error = err as Error;
    const line = getLineFromStack(error.stack!);

    if (!line) {
      return "";
    }

    const segs = line.split(":");
    const file = segs[0];
    const extension = file.split(".")[1].toLowerCase();
    const color = colors[extension as "ts" | "js"];

    return `${color(file)}:${segs[1]}`;
  }
};
