import { Router } from 'express';

import CartManagerMongo from '../controllers/mongo/cartsManagerMongo.js';
import TicketManagerMongo from '../controllers/mongo/ticketManagerMongo.js';
import { logger } from '../utils/logger.js';

const router = Router();

const carritosMongo = new CartManagerMongo();
const ticket = new TicketManagerMongo(); 

router.get("/", async (req, res) => {
    res.render("realTimeProducts", {
    })
})

router.post("/create", async (req, res) => {
    const response = await carritosMongo.createcart();
    res.send(response);
    //return res.send(response);
})

router.delete("/deleteproduct/:cid/products/:pid", async (req, res) => {

    var cid = req.params.cid;
    var pid = req.params.pid;

    console.log(cid);
    console.log(pid);

    const response = await carritosMongo.deleteProduct(cid, pid);



    return res.send(response);
})

router.put("/carts/:cid/products/:pid", async (req, res) => {

    var cid = req.params.cid;
    var pid = req.params.pid;
    var quantity = parseInt(req.body.quantity);
    console.log(cid);
    console.log(pid);
    console.log(quantity);

    const response = await carritosMongo.updateCart(cid, pid, quantity);



    return res.send(response);
})

router.put("/carts/:cid/addproducts/:pid", async (req, res) => {

    var cid = req.params.cid;
    var pid = req.params.pid;
    console.log(cid);
    console.log(pid);

    const response = await carritosMongo.addProductCart(cid, pid);



    return res.send(response);
})

router.delete("/delete/:cid", async (req, res) => {

    var cid = req.params.cid;

    console.log(cid);

    const response = await carritosMongo.deleteCart(cid);



    return res.send(response);
})

function returncid(cid){
    return cid; 
}

router.get("/carts/:cid", async (req, res) => {

    var cid = req.params.cid;

    console.log(cid);
  
    const response = await carritosMongo.getCartProducts(cid);



    return res.send(response);
})

router.get("/products/:cid", async (req, res) => {

    var cid = req.params.cid;
    const response = await carritosMongo.getCartProducts(cid);

    console.log("Imprime response"); 
    const str = JSON.stringify(response);
    console.log(str); 

    const str2 = JSON.parse(str); 

    console.log(str2[0]); 


    const response2 = response[0]; 

    res.render("ViewsCarts", { response2 });

})


router.post("/:cid/purchase", async (req, res) => {

    logger.info('Procedio a la compra: ' + req.session.email);

    var cid = req.params.cid;

    console.log(cid);

    const objectsession  = req.session;

    console.log(objectsession.email);
    
    const purchaser = objectsession.email; 

    try {
        const ticketcreator = await ticket.createticket(purchaser); //llamamos funcion que crea ticket
        logger.info('Se creo ticket de compra para: ' + req.session.email);
        console.log(ticketcreator);

    } catch {
        logger.fatal('Fallo la creacion de ticket para: ' + req.session.email);

    } 


    return res.send("PURCHASE");
})

export default router;
