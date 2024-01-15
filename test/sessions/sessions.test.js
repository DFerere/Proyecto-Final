import chai from "chai";
import supertest from "supertest";

const expect = chai.expect; 
const requester = supertest("http://localhost:8080");  

describe( 'Test para hacer login, crear una sesion, obtener datos de una session y a su vez hace logout', () => {

    it('deberia hacer login, obtener datos de session y logout al hacer un POST a /ecommerce/user/login_passport/test', async () => {
         
        const user = {
            email : 'davidferere@gmail.com',
            password : 'hola1234',
        }; 

        const {statuscode, ok, _body} = await requester.post('/ecommerce/user/login_passport/test').send(user); 

        console.log(statuscode, ok, _body); 


    })
});



