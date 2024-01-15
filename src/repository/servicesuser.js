import { Router } from 'express';
import { usersModel } from '../dao/models/usermodels.js';
import { productsModel } from '../dao/models/productsmodels.js';
import passport from 'passport';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { logger } from '../utils/logger.js';
import moment from 'moment/moment.js';

dotenv.config();

class user {

    async find(username) {

        const Exists = await usersModel.findOne({ email: username });

        return Exists;

    }

    async getallusers() {

        const Exists = await usersModel.find({}, { email: 1, _id: 0, rol: 1, first_name: 1, last_name: 1 });

        return Exists;

    }

    async create(first_name, last_name, email, age, password, rol, last_connection, cart, documents) {
        console.log(cart);
        //const last_connection = "domingo"; 
        const user = await usersModel.create({
            first_name,
            last_name,
            email,
            age,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
            rol,
            last_connection,
            cart,
            documents
        });

        return user;
    }

    async findOne(username) {

        const user = await usersModel.findOne({ email: username }).lean();
        return user;

    }

    async updateconnection(oneusername, thelast_connection) {

        logger.info('Ingreso a update last connection');

        const user = await usersModel.findOneAndUpdate({ email: oneusername }, { last_connection: thelast_connection });
        return user;

    }

    async updatedocuments(email, filename, filepath) {

        const objuser = await usersModel.findOne({ email: email });

        logger.info('Ingreso a actualizar estatus de los documentos cargados');

        console.log(filename);

        console.log("objeto de ususario");
        console.log(objuser);

        let newdocument = { name: filename, reference: filepath };
        console.log(newdocument);
        console.log("objeto documento");
        console.log(newdocument);

        objuser.documents.push(newdocument);
        console.log("el nuevo objeto de ususario");
        console.log(objuser);

        await usersModel.updateOne({
            email: email,
        }, {
            $set: {
                documents: objuser.documents
            }
        });

        //const user = await usersModel.findOneAndUpdate({ email : email }, objuser);
        return;

    }

    async obtainuserstodelete() {
        //Find users with lastConnection less than 10 minutes ago:

        let TEN_MINUTES = moment().subtract(10, 'minutes').toDate();
        console.log("IMPRIMO 10 MINUTOS");
        console.log(TEN_MINUTES);

        const query = { last_connection: { $gte: TEN_MINUTES } };

        // Retrieve those users:
        const users = await usersModel.find(query).exec();

        // console.log("Retrieved users:", users);

        if (!users || users == null || Object.keys(users).length === 0) return `E02|No se encontro ningun usuario que se halla conectado hace 10 minutos o menos.`;

        return users
    }



    async deleteuser(useremail) {

        try {
            const userobj = await usersModel.findOne({
                email: useremail,
            }); 

            if (userobj) {

                const delprod = await usersModel.deleteOne({
                    email: useremail,
                });

                logger.info("Se borro correctamente el usuario")
                return "Se borro correctamente el usuario";


            } else {

                logger.error("Usuarios no existe");
                return "usuario no existe";

            }

        } catch {
            return "No se pudo borrar el usuario, hubo un error";
        }
    }



}

export default user;


