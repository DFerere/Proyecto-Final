import { Router } from 'express';

import ProductManager from '../controllers/ProductManager.js';

const router = Router(); 

const productos = new ProductManager(); 

router.get('/', async (req, res)  => { //trae lista de productos con param limit

    const response = await productos.getProducts();

    res.render('home', {productos:response})
})

export default router; 