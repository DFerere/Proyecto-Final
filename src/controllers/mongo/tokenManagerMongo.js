import { tokenModel } from '../../dao/models/tokenmodels.js';
import tokenrepository from '../../repository/repositorytoken.js';
import user from '../../repository/servicesuser.js'; 
import { logger } from '../../utils/logger.js';
import userManager from '../userManager.js';


const token = new tokenrepository();
const usermanager = new userManager(); 


class TokenManagerMongo {

    async createtoken(email) {

        const tokenobject = await token.createtoken(email); 
        return tokenobject;
       

    }; 

    async validatetoken(tokenvalue, newpassword){

        try {
            const tokenobj = await token.findtoken(tokenvalue); 
            logger.info("Encontro token: " + tokenvalue); 

            const tokentime = tokenobj.timestamp;
            console.log(tokentime);
            const time = Date.now(); 
            const currenttime = time/1000; 

            
            console.log(currenttime);

            const exptime = currenttime - tokentime; 

            console.log(exptime);

            if (exptime >= 3600){
                console.log("Token expiro");
                logger.error("Token expiro: " + tokenvalue);
            } else {
                console.log("Token valido");
                logger.info("Token valido: " + tokenvalue);
                const emailuser = tokenobj.email;
                console.log(emailuser); 

                const result = await usermanager.validatepassword(newpassword, emailuser);
                console.log(result); 
                if (result === 1){

                    //cambio password

                    await usermanager.changepassword(newpassword, emailuser);
                    logger.info("Se cambio password de forma exitosa:" + tokenobj.email);
                    
                    await token.deletetoken(tokenvalue); 
                    
                    return "Se cambio la contrasena de forma exitosa"; 

                } else {
                    logger.error("La nueva contrasena es igual a la anterior: " + tokenobj.email);
                    return "La contrasena nueva es igual a la anterior, regrese y coloque una distinta"; 
                }

            }


        } catch {
            logger.fatal("No encontro token: " + tokenvalue); 
        }

        //busca token 
        //valida tiempos
        //niego o elimina 


    }



}


export default TokenManagerMongo; //exportamos clase TokenManagerMongo