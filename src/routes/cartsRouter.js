import { Router } from 'express';

import ProductManager from '../controllers/ProductManager.js';
import CartManager from '../controllers/CartManager.js';

const router = Router(); 

const carts = new CartManager(); 

router.post('/', async (req, res)  => {
    
    await carts.createCart();

    res.status(200).send();
})

router.get('/:cid', async (req, res)  => {

    var cid = parseInt(req.params.cid);
    
    const response = await carts.getcartByID(cid);

    res.send(response)
})

router.post('/:cid/products/:pid', async (req, res)  => {
    
    var cid = parseInt(req.params.cid);
    var pid = parseInt(req.params.pid);
    
    const response = carts.addproductCart(cid, pid)

    res.status(200).send(response);
})

export default router; 
