import chai from "chai";
import supertest from "supertest";

const expect = chai.expect; 
const requester = supertest("http://localhost:8080"); 

describe( 'Test para probar obtener productos', () => {

    it('deberia obtener los productos al hacer un GET a /api/products/management/getallproducts', async () => { 

        const {statuscode, ok, _body} = await requester.get('/api/products/management/getallproducts'); 

        console.log(statuscode, ok, _body); 

    })
}); 

describe( 'Test para crear productos', () => {

    it('deberia obtener el producto creado al hacer un POST a /api/products/management/management/create', async () => {
         
        const product = {
            title : 'Teclado',
            description : 'Teclado',
            price : 250,
            thumbnail : 'www.teclado.com',
            code : 88898,
            stock : 200,
            status : true,
            category : 'Teclado',
            owner : 'admin',
        }; 

        const {statuscode, ok, _body} = await requester.post('/api/products/management/management/create').send(product); 

        console.log(statuscode, ok, _body); 


    })
});

describe( 'Test para eliminar productos', () => {

    it('deberia eliminar el producto enviado al hacer un post a /api/products/management/management/delete', async () => {
         
        const product = {
            idproduct : "6577acb290ae9846a2a85254",
            owner : "admin"
        }; 

        const {statuscode, ok, _body} = await requester.post('/api/products/management/management/delete').send(product); 

        console.log(statuscode, ok, _body); 


    })
});
