import { Router } from 'express';
import { usersModel } from '../dao/models/usermodels.js';
import passport from 'passport';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

import user from '../repository/servicesuser.js';

import mailing from '../services/email.js';
import { logger } from '../utils/logger.js';

dotenv.config();
const usermailing = new mailing();
const userservice = new user();

class userManager {

    async registeruser(username, email, password) {

        const userExists = await usersModel.findOne({ email });

        if (userExists) { //validamos si usuario ya existe en la BD
            logger.info('Usuario existe en base de datos ' + email);
            return res.send("El usuario ya existe");
        }

        if (email == process.env.ADMIN_EMAIL_1 || email == process.env.ADMIN_EMAIL_2) {
            const rol = "admin";
            const user = await usersModel.create({ username, email, password, rol });
            logger.info('Se registro usuario admin: ' + email);

            return;
        } else {
            const rol = "user";
            const user = await usersModel.create({ username, email, password, rol });
            logger.info('Se registro usuario regular: ' + email);
            return;
        }

    };

    async useremail(email) {

        const userExists = await usersModel.findOne({ email });

        if (userExists) {
            //llamamos a servicio de envio de correo
            logger.info('Se envio correo al usuario ' + email);
            await usermailing.usemailing();

        } else {
            logger.warning('usuario no existe: ' + email);
            return "Correo enviado";
        }



    }

    async useremailpassword(email, token) {

        const userExists = await usersModel.findOne({ email });

        if (userExists) {
            //llamamos a servicio de envio de correo
            await usermailing.changepasswordmailing(token);
            logger.info('Se envio correo de cambio de clave al usuario ' + email);


        } else {
            logger.warning('usuario no existe: ' + email);
            return "Correo enviado";
        }



    }

    async validatepassword(password, email) {

        console.log(email);
        console.log(password);

        try {

            const userExists = await usersModel.findOne({ email });

            if (userExists) {

                if (!bcrypt.compareSync(password, userExists.password)) {
                    return 1;
                } else {
                    logger.error("Contrasena nueva y vieja son las mismas del usuario: " + email);
                    return 2;
                }


            } else {

                logger.error("Usuario no existe");

            }

        } catch {
            info.error("Fallo el validar nueva contrasena");


        }


    }

    async changepassword(password, email) {

        console.log(email);
        console.log(password);

        try {

            const userExists = await usersModel.findOne({ email });
            console.log(userExists);

            if (userExists) {

                const newpassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

                userExists.password = newpassword;

                console.log(userExists);
                console.log(newpassword);

                await usersModel.updateOne({ email: userExists.email }, { $set: { password: userExists.password } });


            } else {

                logger.error("Usuario no existe");

            }

        } catch {
            info.error("Fallo cambiar nueva contrasena");


        }


    }

    async changerol(email) {

        try {

            const user = await usersModel.findOne({ email });

            const rol = user.rol;

            if (rol === "premium") {

                user.rol = "user";

                await usersModel.updateOne({ email: user.email }, { $set: { rol: user.rol } });

                logger.info("Se cambio rol del usuario con exito: " + email);

            } else {

                user.rol = "premium";
                await usersModel.updateOne({ email: user.email }, { $set: { rol: user.rol } });
                logger.info("Se cambio rol del usuario con exito: " + email);
            }

        } catch {

            logger.error("No se pudo cambiar rol del usuario: " + email);

        }

    }


    async validatedocuments(email) {
        const docu = 0;

        try {

            const user = await usersModel.findOne({ email });

            const documents = user.documents;
            const rol = user.rol;
            let docu2 = 0;


            for (let i = 0; i < 10; i++) {
                //console.log(documents[i]);
                if (documents[i].name == "DNI.pdf" || documents[i].name == "Cuenta.pdf" || documents[i].name == "Domicilio.pdf") {
                    docu2++;
                    console.log(docu2);
                    console.log("Tiene documento");
                    if (docu2 === 3) {

                        if (rol === "premium") {

                            user.rol = "user";

                            await usersModel.updateOne({ email: user.email }, { $set: { rol: user.rol } });

                            logger.info("Se cambio rol del usuario con exito: " + email);
                            return; 

                        } else {

                            user.rol = "premium";
                            await usersModel.updateOne({ email: user.email }, { $set: { rol: user.rol } });
                            logger.info("Se cambio rol del usuario con exito: " + email);
                            return; 
                        }
                    }
                } else {
                    console.log("No tiene documento");
                }
            }

            //console.log(docu2); 

            /*const keysArray = Object.keys(docuobj);

            // Count the number of keys
            const count = keysArray.length;

            console.log("Number of keys: " + count);*/

            /*if (rol === "premium"){
 
                 user.rol = "user";
 
                 await usersModel.updateOne({email : user.email}, {$set: {rol: user.rol}});
 
                 logger.info("Se cambio rol del usuario con exito: " + email);
 
             } else {
 
                 user.rol = "premium";
                 await usersModel.updateOne({email : user.email}, {$set: {rol: user.rol}});
                 logger.info("Se cambio rol del usuario con exito: " + email);
             }*/

        } catch {

            logger.error("No se pudo cambiar rol del usuario: " + email);
            res.send("Error aL cambiar ROL, verifique haber cargado su DNI, Estado de Cuente y Comprobante de Domicilio"); 

        }

    }


    async changedocumentstatus(email, filename, filepath) {

        try {

            // const user = await usersModel.findOne({email});

            const user = await userservice.updatedocuments(email, filename, filepath);


        } catch {

            logger.error("No se pudo cambiar estatus de documento de usuario: " + email);

        }

    }

    async getallusers() {

        try {

            // const user = await usersModel.findOne({email});

            const user = await userservice.getallusers();
            return user; 


        } catch {

            logger.error("Error trayendose todos los usuarios de la base de datos");

        }

    }


    async deleteusers() {

        try {

            // const user = await usersModel.findOne({email});

            const user = await userservice.obtainuserstodelete();
            return user; 


        } catch {

            logger.error("Error borrando usuarios de la base de datos");

        }

    }

    async admindeleteuser(email) {

        console.log(email); 

        try {

            // const user = await usersModel.findOne({email});

            const user = await userservice.deleteuser(email);
            logger.info("Se borro el usuario de forma exitosa");
            return user;  


        } catch {

            logger.error("Error borrando usuario de la base de datos");

        }

    }

}

export default userManager;

