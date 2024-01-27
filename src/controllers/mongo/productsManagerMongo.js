import { productsModel } from '../../dao/models/productsmodels.js';
import products from '../../repository/servicesproducts.js';
import CartManagerMongo from './cartsManagerMongo.js';

import { logger } from '../../utils/logger.js';

const servicesproducts = new products();
const cart = new CartManagerMongo();


class ProductManagerMongo {

    //Funcion para agregar productos
    async createproduct(title, description, price, thumbnail, code, stock, status, category, owner) {

        try {

            const produ = await servicesproducts.create(title, description, price, thumbnail, code, stock, status, category, owner);
            console.log(produ);
            logger.info("se creo producto con exito");
            return produ;

        } catch {

            logger.fatal("fallo la creacion de producto");

        };

    }

    async getallProducts() {

        try {
            const getprod = await servicesproducts.getallproducts();
            logger.info("obtuvo todos los productos");
            return getprod;
        } catch {
            logger.fatal("no pudo obtener todos los productos");
        }


    }

    async getproduct(productid) {

        try {
            const getprod = await servicesproducts.getproducts(productid);
            logger.info("obtuvo el producto");
            return getprod;
        } catch {
            logger.fatal("no pudo obtener el producto");
        }


    }


    async getProducts(limit) {

        try {

            const getprod = await servicesproducts.getproducts(limit);
            logger.info("se obtuvo productos con parametro limit");
            return getprod;

        } catch {

            logger.fatal("No se obtuvo productos con parametro limit");

        }

    }

    async getpageProducts(query, page, limit, sortvalue) {
        console.log("Estoy en query");
        console.log(query);
        console.log(page);
        console.log(limit);
        console.log(sortvalue);

        const myCustomLabels = {
            totalDocs: 'itemCount',
            docs: 'payload',
            limit: 'limit',
            page: 'pagina',
            nextPage: 'next',
            prevPage: 'prev',
            totalPages: 'totalPages',
            pagingCounter: 'slNo',
            meta: 'paginator',
        };

        try {

            const getprod = await productsModel.paginate(query, { limit: limit, page: page, sort: { _id: sortvalue, price: 1 }, customLabels: myCustomLabels });
            logger.info("se obtuvo productos con paginacion");
            return getprod;

        } catch {
            logger.fatal("no se obtuvo productos con paginacion");

        }


    };

    async deleteproducts(idproduct) {

        try {

            const del = await servicesproducts.deleteproducts(idproduct);
            logger.info("Se logro borrar el producto");
            return del;

        } catch {

            logger.fatal("No se logro borrar el producto");

        }



    };

    async update(idproduct, update_element) {

        try {

            const update = await servicesproducts.updateproducts(idproduct, update_element);
            logger.info("se actualizo datos del producto");
            return update;

        } catch {

            logger.fatal("No se pudo actualizar datos del producto");

        }


    }

    async validatestock(cartid) {

        //console.log("ENTRO EN VALIDATE STOCK");

        const products = await cart.getCartProducts(cartid); //Obtenemos los productos del carrito

        //console.log("ACA IMPRIME PRODUCTOS DEL CARRITO");
        //console.log(products[0].Products);

        //cantidad de productos en el carrito
        //console.log(products[0].Products.length);
        const lenproducts = products[0].Products.length;

        const prices = [];

        for (let i = 0; i < lenproducts; i++) {

            //console.log("IMPRIME QUANTITY"); //validacion
            //console.log(products[0].Products[i].quantity); //validacion
            const quantityprod = products[0].Products[i].quantity;

            //console.log("IMPRIME STOCK");

            //console.log(products[0].Products[i].product.stock); //validacion
            const stockprod = products[0].Products[i].product.stock;

            if (quantityprod <= stockprod) {
                //console.log("SI HAY PRODUCTO");
                const priceprod = products[0].Products[i].product.price;
                prices.push(priceprod); //se agregar precio del producto despues de validado el stock
            } else {
                logger.error("No hay suficiente stock de un producto");
                const prodname = products[0].Products[i].product.title; 
                return prodname; //se retorno nombre del producto que no tiene suficiente stock
            }
        }

        //console.log("LISTA DE PRECIOS");

        //console.log(prices);

        const sum = prices.reduce((partialSum, a) => partialSum + a, 0); //se suma lista de precios de productos en el carrito

        //console.log("SUMA DE PRECIOS"); 
        //console.log(sum); //SUMA DE PRECIOS

        logger.info("Validacion de stock de productos exitosa"); 

        return sum; //se retorna monto de la compra


    }

}

export default ProductManagerMongo;



