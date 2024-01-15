import { logger } from '../utils/logger.js';



class loggertestManager {

    async loggertest() {

        const arraylogger = []; 

        const debug = logger.debug();
        const http = logger.http();
        const info = logger.info();
        const warning = logger.warning();
        const error = logger.error();
        const fatal = logger.fatal();  

    }



}


export default loggertestManager; //exportamos clase loggertestManager