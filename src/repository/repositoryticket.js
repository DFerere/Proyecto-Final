import { Router } from 'express';
import { usersModel } from '../dao/models/usermodels.js';
import { ticketModel } from '../dao/models/ticketsmodels.js';
import passport from 'passport';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

class tickets {

    async createticket(code, purchase_datetime, amount, purchaser){

        const cartcreate = await ticketModel.create({
            code,
            purchase_datetime,
            amount,
            purchaser,
        });

        return cartcreate; 

    }

}

export default tickets;