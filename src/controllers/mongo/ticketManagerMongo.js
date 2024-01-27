import ProductManagerMongo from './productsManagerMongo.js';
const productos = new ProductManagerMongo(); //instanciamos clase que maneja productos
import { cartsModel } from '../../dao/models/cartsmodels.js';
import ticketsrepository from '../../repository/repositoryticket.js';
import products from '../../repository/servicesproducts.js';
import { logger } from '../../utils/logger.js';
import mailing from '../../services/email.js';
import userManager from '../userManager.js';
import CartManagerMongo from './cartsManagerMongo.js';
//import ProductManagerMongo from './productsManagerMongo.js';

const ticket = new ticketsrepository();
const mail = new mailing();
const user = new userManager();
const cart = new CartManagerMongo();
const productmanager = new ProductManagerMongo();

class TicketManagerMongo {

    async createticket(purchaser) {

        const lengthcode = 5;

        function makeid(length) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < length) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                counter += 1;
            }
            return result;
        }

        const code = makeid(lengthcode);
        const codestring = code.toString();
        //console.log(codestring);

        var datetime = new Date();
        const datetimestring = datetime.toString();
        //console.log(datetimestring);

        //console.log(purchaser);

        const objuser = await user.finduser(purchaser); //Buscamos usuario en la BD

        //console.log(objuser);

        const cartid = objuser.cart[0];
        //console.log(cartid);

        const cartidString = cartid._id.toString(); //Obtenemos ID del carrito del ususario

        //console.log(cartidString);

        const valistock = await productos.validatestock(cartidString);


        const type = typeof valistock;

        //console.log(type);


        if (type == "number") {

            const amount = valistock; //suma de precios de productos a comprar
            //console.log(amount);

            try {

                const cartcreate = await ticket.createticket(code, datetimestring, amount, purchaser);

                await mail.ticketmailing(code, purchaser); //Enviamos correo al usuario de creacion de ticket

                logger.info("se creo ticket de compra");

                return cartcreate;


            } catch {

                logger.fatal("No se pudo crear ticket de compra");

                return "Fallo creacion de ticket";


            }

        } else {
            logger.error("Fallo validacion de stock, no hay suficiente stock"); 
        }

    }





}


export default TicketManagerMongo; //exportamos clase CartManagerMongo