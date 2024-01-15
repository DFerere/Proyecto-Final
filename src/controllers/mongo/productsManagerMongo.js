import { productsModel } from '../../dao/models/productsmodels.js';
import products from '../../repository/servicesproducts.js';

import { logger } from '../../utils/logger.js';

const servicesproducts = new products();


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

}

export default ProductManagerMongo;



