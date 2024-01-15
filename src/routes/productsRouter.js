import { Router } from 'express';

import ProductManager from '../controllers/ProductManager.js';

const router = Router(); 


const productos = new ProductManager(); 

router.get('/', async (req, res)  => { //trae lista de productos con param limit

    var limit = req.query.limit;
    parseInt(limit);
    const response = await productos.getProducts();

    if(limit === undefined){
        return res.send(response)
    }

    const slicedArray = response.slice(0, limit);

    res.send(slicedArray)
})



router.get('/:pid', async (req, res)  => { //trae producto por ID

    var pid = parseInt(req.params.pid);
    
    const response = await productos.getproductByID(pid);

    res.send(response)
})

router.post('/', async (req, res)  => { //añade producto

    const prod = req.body;  
    
    await productos.addProduct2(prod.title, prod.description, prod.price, prod.thumbnail, prod.code, prod.stock, prod.status, prod.category);

    res.status(200).send();
})

router.put('/:pid', async (req, res)  => { //actualiza prducto
    
    var pid = parseInt(req.params.pid);
    const prodput = req.body; 
    
    const response = await productos.updateproductByID(pid, prodput.title, prodput.description, prodput.price, prodput.thumbnail, prodput.code, prodput.stock, prodput.status, prodput.category);

    res.status(200).send(response);
})

router.delete('/:pid', async (req, res)  => { //elimina producto
    
    var pid = parseInt(req.params.pid);
    
    const response = await productos.deleteproductByID(pid);

    res.status(200).send(response);
})

export default router; 
