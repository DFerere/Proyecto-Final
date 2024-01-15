import { Router } from 'express';
import privateRoutes from '../middlewares/privateroutes.js';
import CustomError from '../repository/errors/CustomError.js';
import EErrors from '../repository/errors/EErrors.js';
import { generateRegisterUserErrorInfo, generateUserErrorInfo } from '../repository/errors/Info.js';
import { logger } from '../utils/logger.js';

const router = Router(); 

router.get('/login', async (req, res)  => { //entra a vista de login
    logger.info('Ingreso a pagina de Login'); 
    if(req.session.isLogged){
        logger.info('usuario ya estaba logueado'); 
        return res.redirect('/ecommerce/home/profile'); 
    };

    res.render('login');
});


router.get('/signup', async (req, res)  => { //entra a vista de signup

    if(req.session.isLogged){
        return res.redirect('/ecommerce/home/profile'); 
    };

    res.render('signup');
});


router.get('/profile', async (req, res)  => { //entra a vista de login

    const { username, email } = req.session;
    console.log(username);
    logger.info('usuario ingreso a su perfil: ' + email);

    if(!req.session.isLogged){
        return res.redirect('/ecommerce/home/login'); 
    };

    res.render('profile', { username, email});
});

router.get('/logout', async (req, res)  => { //entra a vista de login

    logger.info('Usuario hizo logout: ' + req.session.email);

    req.session.destroy(); 

    res.redirect('/ecommerce/home/login');
});

router.get('/logout/test', async (req, res)  => { //entra a vista de login

    logger.info('Usuario hizo logout: ' + req.session.email);

    req.session.destroy(); 

    res.send("Logout exitoso");
});

//obtener sesiones activas
router.get('/activesessions', async (req, res)  => { //entra a vista de login

    logger.info('Usuario hizo logout: ' + req.session.email);

    

    res.send("Logout exitoso");
});

router.get("/failurelogin", async (req, res) => {
    const email = req.body.email; 
    logger.error('Fallo login del usuario: ' + email);
    if(!email){
        CustomError.createError({
            name: "Email errado",
            message: "Error de login", 
            cause: generateUserErrorInfo({email}),
            code: EErrors.INVALID_TYPE_ERROR
        })
    }

    res.send("Sorry :( credenciales incorrectas"); 
})

router.get("/failregister", async (req, res) => { 

    const {first_name, last_name, username, email, age}  = req.body;
    logger.error('Fallo registro del usuario: ' + email);
    /*if(!email || !first_name || !last_name || age || !username){
        CustomError.createError({
            name: "Error en dato de registro",
            message: "Error error registrandose", 
            cause: generateRegisterUserErrorInfo({email, first_name, last_name, age}),
            code: EErrors.INVALID_TYPE_ERROR
        })
    }*/

    res.send("Caramba algo salio mal con el resgitro, al parecer tu correo ya existe"); 
})

router.get("/current", async (req, res) => {
   
    const objectsessionDTO  = req.session;
    console.log("este es req session"); 
    console.log(req.session.email);

    res.send(objectsessionDTO); 
})

export default router; 

