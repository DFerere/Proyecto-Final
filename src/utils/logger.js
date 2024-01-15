import {createLogger, format, transports, addColors} from "winston";
const {combine, timestamp, label, printf} = format; 
import config from "../config/config.js"; 

const e = config.environment; 

console.log(e); 

console.log("estamos en logger"); 

const myformat = printf(({level, message, label, timestamp
}) => { 
    return `${timestamp} [${label}] ${level}: ${message}`; 
}); 

const myCustomLevels = {
    levels: {
      fatal: 0,
      error: 1,
      warning: 2,
      info: 3,
      http: 4,
      debug: 5
    },
    colors: {
      debug: 'blue',
      http: 'green',
      info: 'yellow',
      warning: 'orange',
      error: 'purple',
      fatal: 'red'
    }
  };

addColors(myCustomLevels.colors);

let logger; 


/*export const logger = createLogger({
    format: combine (label({label :'logs'}), timestamp(), myformat),
    levels: myCustomLevels.levels,
    level: 'silly', 
    //colors: myCustomLevels.colors, 
    transports: [new transports.Console({
        //level: 'info'//myCustomLevels.levels
    }),
],  
});*/

if(e === "DEV"){

  logger = createLogger({
    format: combine (label({label :'logs'}), timestamp(), myformat),
    levels: myCustomLevels.levels,
    level: 'debug', 
    //colors: myCustomLevels.colors, 
    transports: [new transports.Console({
        //level: 'info'//myCustomLevels.levels
    }),
    new transports.File({ filename: 'errors.log' }),
],  
})

} else {

  logger = createLogger({
    format: combine (label({label :'logs'}), timestamp(), myformat),
    levels: myCustomLevels.levels,
    level: 'info', 
    //colors: myCustomLevels.colors, 
    transports: [new transports.Console({
        //level: 'info'//myCustomLevels.levels
    }),
    new transports.File({ filename: 'errors.log', leve: 'error' }),
],  
})

}; 

export { logger }; 