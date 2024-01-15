import passport from 'passport';
import local from 'passport-local';
import GithubStrategy from 'passport-github2';
import { usersModel } from '../dao/models/usermodels.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import userManager from '../controllers/userManager.js';
import user from '../repository/servicesuser.js';
import cart from '../repository/servicescart.js';
import { cartsModel } from '../dao/models/cartsmodels.js';
import { logger } from '../utils/logger.js';

const LocalStrategy = local.Strategy;
dotenv.config();
const users = new userManager();
const service = new user();
const servicecart = new cart();

const initializePassport = () => {
    passport.use(
        'register',
        new LocalStrategy(
            { passReqToCallback: true, usernameField: 'email' },
            async (req, username, password, done) => {
                const { first_name, last_name, email, age } = req.body;
                console.log(email);
                try {


                    try {
                        const userExists = await service.find(email);


                        if (userExists) {
                            logger.error("Correo ya esta registrado " + email);
                            return done(null, false);
                        }

                        if (email == process.env.PREMIUM_EMAIL_1 || email == process.env.PREMIUM_EMAIL_2 || email == process.env.PREMIUM_EMAIL_3) {
                            const rol = "premium";
                            console.log(rol);
                            let cart1 = {}
                            cart1 = { Products: [] }
                            const cart = await servicecart.createnewcart();
                            console.log(cart);

                            const user = await service.create(first_name, last_name, email, age, password, rol, cart);
                            //const user = await service.create(first_name, last_name, email, age, password, rol);

                            return done(null, user);
                        }

                        if (email == process.env.ADMIN_EMAIL_1 || email == process.env.ADMIN_EMAIL_2) {
                            const rol = "admin";
                            const cart = {};
                            const user = await service.create(first_name, last_name, email, age, password, rol, cart);

                            return done(null, user);
                        } else {
                            const rol = "user";
                            console.log(rol);
                            let cart1 = {}
                            cart1 = { Products: [] }
                            const cart = await servicecart.createnewcart();
                            console.log(cart);
                            const last_connection = new Date(); 
                            let documents = { name: "", reference: ""}; 

                            const user = await service.create(first_name, last_name, email, age, password, rol, last_connection, cart, documents);


                            return done(null, user);
                        }


                    } catch {
                        logger.error("Fallo en buscar usuario para registro: " + email);
                    };


                }
                catch (error) {
                    logger.fatal("Error registrando usuario");
                    return done(error);
                }
            }
        )
    );

    passport.use(
        'github',
        new GithubStrategy({
            clientID: 'Iv1.3ae8921143d00254',
            clientSecret: '047a3f9446e2a558e6734a2a8dd602ed41a14f28',
            callbackURL: 'http://localhost:8080/ecommerce/user/githubcallback',
            scope: ['user : email'],
        },
            async (accesToken, refreshToken, profile, done) => {
                console.log(profile);

                try {
                    const email = profile._json.email;
                    const user = await usersModel.findOne({ email });

                    passport.serializeUser((user, done) => {
                        done(null, user._id);
                    });

                    passport.deserializeUser(async (id, done) => {
                        const user = await usersModel.findById(id);
                        done(null, user);
                    });

                    if (!user) {
                        const newUser = usersModel.create({
                            first_name: profile._json.name,
                            last_name: '',
                            age: 18,
                            password: '',
                            email: profile._json.email
                        });

                        return done(null, newUser);
                    }

                    return done(null, user);
                }
                catch (error) {
                    return done(error);
                }



                done(null);

            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await usersModel.findById(id);
        done(null, user);
    });



    passport.use(
        'login',
        new LocalStrategy(
            { usernameField: 'email' },
            async (username, password, done) => {
                try {
                    const user = await service.findOne(username);
                    if (!user) {
                        return done(null, false);
                    }

                    if (!bcrypt.compareSync(password, user.password)) {
                        return done(null, false);
                    }

                    const last_connection = new Date(); 

                    const updateuser = await service.updateconnection(username, last_connection); 

                    console.log (updateuser); 

                    return done(null, user);

                } catch (error) {
                    return done(error);
                }
            }
        )
    );


};

export default initializePassport;
