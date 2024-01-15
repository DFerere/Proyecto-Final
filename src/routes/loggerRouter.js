import { Router } from 'express';

import loggerManager from '../controllers/loggerManager.js';

const router = Router(); 


const loggertest = new loggerManager(); 

router.get('/', async (req, res)  => { //testea logger

    loggertest.loggertest(); 
    res.send("Revisa archivo errors.log"); 
})


export default router;