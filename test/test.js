const { Tracey } = require("../dist/index.js");

const messages = [
  "Working on new files",
  "Caching progression",
  "Uploading to database",
  "Starting new threads",
  "New files uploaded",
  "Starting with next task",
];

let i = 0;
const max = 20;
const logger = new Tracey("{level} {message}");

logger.warn("Warning you for this!");
logger.info("This message is pinned!", { pin: true });
logger.info("This is information.");

setInterval(() => logger.info(`Progress ${++i}/${max}..`, { pin: true }), 1500);

setInterval(
  () => logger.info(messages[Math.floor(Math.random() * messages.length)]),
  500
);
