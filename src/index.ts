import chalk from "chalk";
import { getColoredLine } from "./line";

class Tracey {
  #pattern = "{type} [{file}]: {message}";

  constructor(pattern?: string) {
    if (pattern) {
      this.#pattern = pattern;
    }
  }

  #buildFromPattern(type: string, message: string) {
    const file = getColoredLine();
    return this.#pattern
      .replace("{type}", type)
      .replace("{file}", file)
      .replace("{message}", message);
  }

  info(message: string) {
    const type = chalk.bgBlue("info");
    const out = this.#buildFromPattern(type, message);
    console.log(out);
  }

  error(message: string) {
    const type = chalk.bgRed("err");
    const out = this.#buildFromPattern(type, message);
    console.log(out);
  }

  warn(message: string) {
    const type = chalk.bgYellow("warn");
    const out = this.#buildFromPattern(type, message);
    console.log(out);
  }
}

export default Tracey;
