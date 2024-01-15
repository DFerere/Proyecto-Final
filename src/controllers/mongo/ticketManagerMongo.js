import ProductManagerMongo from './productsManagerMongo.js';
const productos = new ProductManagerMongo(); //instanciamos clase que maneja productos
import { cartsModel } from '../../dao/models/cartsmodels.js';
import ticketsrepository from '../../repository/repositoryticket.js';
import products from '../../repository/servicesproducts.js';
import { logger } from '../../utils/logger.js'; 

const ticket = new ticketsrepository();

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
        console.log(codestring);
        
        var datetime = new Date();
        const datetimestring = datetime.toString(); 
        console.log(datetimestring);

        console.log(purchaser); 

        const amount = 1000; //constante de prueba


       try {
            
            const cartcreate = await ticket.createticket(code, datetimestring, amount, purchaser);
            logger.info("se creo ticket de compra"); 
            return cartcreate;


        } catch{

            logger.fatal("No se pudo crear ticket de compra"); 

            return "Fallo creacion de ticket"; 


        }   

            

    }



}


export default TicketManagerMongo; //exportamos clase CartManagerMongo