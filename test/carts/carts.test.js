import chai from "chai";
import supertest from "supertest";

const expect = chai.expect; 
const requester = supertest("http://localhost:8080");  

describe( 'Test para crear crear carritos', () => {

    it('deberia crear el carrito al hacer un POST a /mongo/carts/create', async () => { 

        const {statuscode, ok, _body} = await requester.post('/mongo/carts/create'); 

        console.log(statuscode, ok, _body); 

    })
});

describe( 'Test para agregar producto a un carrito', () => {

    it('deberia obtener los productos al hacer un PUT a /mongo/carts/carts/:cid/addproducts/:pid', async () => { 

        const cid = '6552c38a49e9ce52242b3fb0';
        const pid = '65090407bcbd50e483127026';

        const {statuscode, ok, _body} = await requester
        .put(`/mongo/carts/carts/${cid}/addproducts/${pid}`)
        .set('cid', cid)
        .set('pid', pid);

        console.log(statuscode, ok, _body); 

    })
});

describe( 'Test para eliminar un carrito', () => {

    it('deberia eliminar un carrito al hacer un DELETE a /mongo/carts/delete/:cid', async () => { 

        const cid = '657f4c8734b11b17b1fa9bdc';

        const {statuscode, ok, _body} = await requester
        .put(`/mongo/carts/delete/${cid}`)
        .set('cid', cid)

        console.log(statuscode, ok, _body); 

    })
});