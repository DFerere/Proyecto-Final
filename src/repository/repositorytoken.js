import { usersModel } from '../dao/models/usermodels.js';
import { tokenModel } from '../dao/models/tokenmodels.js';
import passport from 'passport';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { logger } from '../utils/logger.js';
import { randomAlphanumeric } from 'random-string-alphanumeric-generator';

dotenv.config();



class tokens {

    async createtoken(email) {

        console.log(email);

        try {
            const Exists = await usersModel.findOne({ email: email }).lean();

            if (Exists) {

                const token = randomAlphanumeric(25);
                const time = Date.now();

                const nowtime = time / 1000;

                console.log(token);
                console.log(nowtime);

                try {
                    const tokencreate = await tokenModel.create({ email: email, tokenvalue: token, timestamp: nowtime });
                    console.log(tokencreate);
                    logger.info("Se envio correo de recuperacion de contraseña al usuario " + email);
                    console.log(token);
                    return token;

                } catch {
                    logger.fatal("Hubo un error creando token de recuperacion de contraseña al usuario " + email);
                }


                logger.info("encontro usuario para recuperacion de contraseña");

            } else {
                logger.error("error en encontrar usuario para recuperacion de contraseña: " + email);
                return "Correo no existe";

            }
        } catch {
            logger.fatal("error en encontrar usuario para recuperacion de contraseña");

        }



    }

    async deletetoken(token, email) {

        try {
            const tokendeleted = await tokenModel.deleteOne({ tokenvalue: token });
            logger.info("Token fue eliminado: " + token + email);

        } catch {
            logger.fatal("No se pudo eliminar token: " + token);
        }


    }

    async findtoken(token) {

        try {

            const tokenfound = await tokenModel.findOne({ tokenvalue: token });
            logger.info("encontre el token: " + token);
            return tokenfound;

        } catch {

            logger.fatal("Error buscando token");

        }
    }

}

export default tokens;