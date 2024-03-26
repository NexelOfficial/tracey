import chalk from "chalk";
import { getColoredLine } from "./line";

type LogOptions = {
  pin: boolean;
};

export class Tracey {
  #pattern: string = "{level} [{file}]: {message}";
  #pin: string | undefined;
  #pinned: string = chalk.bgCyan("pinned");

  constructor(pattern?: string) {
    if (pattern) {
      this.#pattern = pattern;
    }
  }

  #getTime() {
    return chalk.bgGrey(new Date().toLocaleTimeString());
  }

  #buildFromPattern(level: string, message: string) {
    const file = getColoredLine();
    return this.#pattern
      .replace("{level}", level)
      .replace("{file}", file)
      .replace("{message}", message)
      .replace("{time}", this.#getTime());
  }

  #log(message: string, opts?: LogOptions) {
    if (opts?.pin) {
      if (!this.#pin) {
        process.stdout.write("\n");
      }

      this.#pin = message;
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      process.stdout.write(`${this.#pinned} ${message}`);
      return;
    }

    if (this.#pin) {
      process.stdout.cursorTo(0);
      process.stdout.clearLine(0);
      process.stdout.write(`${message}\n${this.#pinned} ${this.#pin}`);
    } else {
      process.stdout.write("\n" + message);
    }
  }

  info(message: string, opts?: LogOptions) {
    const level = chalk.bgBlue("info");
    const out = this.#buildFromPattern(level, message);
    this.#log(out, opts);
  }

  error(message: string, opts?: LogOptions) {
    const level = chalk.bgRed("err");
    const out = this.#buildFromPattern(level, message);
    this.#log(out, opts);
  }

  warn(message: string, opts?: LogOptions) {
    const level = chalk.bgYellow("warn");
    const out = this.#buildFromPattern(level, message);
    this.#log(out, opts);
  }
}

export default Tracey;
