import { Command } from 'commander';
import dotenv, { config } from 'dotenv';

const program = new Command(); 


program 
  .option('-m <mode>', 'entorno de ejecucion', 'prod');
program.parse();

const environment = program.opts().m; 

console.log("estamos en config"); 
console.log(environment); 

dotenv.config({ path : environment==="dev"?'./src/.env.development' : './src/.env'}); 

export default {
    port: process.env.PORT,
    mongosession: process.env.MONGO_URL_SESSION,
    mongosecret: process.env.MONGO_SECRET,
    admin1: process.env.ADMIN_EMAIL_1,
    admin2: process.env.ADMIN_EMAIL_2,
    mongourl: process.env.MONGO_URL,
    email: process.env.EMAIL_MAILING, 
    password: process.env.PASSWORD_MAILING,
    environment: process.env.ENVIRONMENT

} 

