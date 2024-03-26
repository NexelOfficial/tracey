import Tracey from "./index";

const logger = new Tracey();

(() => {
  logger.warn("Warning you for this!");
})();

try {
    throw new Error("Fatal!");
} catch(err) {
    logger.error("Horrible error has been thrown!");
}

logger.info("This is information.");