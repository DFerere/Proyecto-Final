import { logger } from "../utils/logger.js";


console.log("error logger: " + process.env.ENVIRONMENT);


export const errors = async (req, res, next) => {
    
    logger.info(`${req.method} en ${req.url}`);
    try {
        await next();

    } catch (err) {
        logger.error(err);
    }

}; 