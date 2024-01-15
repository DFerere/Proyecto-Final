import ProductManagerMongo from './productsManagerMongo.js';
const productos = new ProductManagerMongo(); //instanciamos clase que maneja productos
import { cartsModel } from '../../dao/models/cartsmodels.js';
import carts from '../../repository/servicescart.js';
import products from '../../repository/servicesproducts.js';
import { logger } from '../../utils/logger.js';

const servicescarts = new carts();

class CartManagerMongo {

    async addProductCart(idCart, idProduct) {

        console.log("Estamos en addProductCart");
        console.log(idProduct);
        console.log(idCart);

        if (idCart == null) {

            let quantity_init = 1;
            console.log(idCart);
            try {
                const cartcreate = await servicescarts.create(idCart, idProduct, quantity_init);
                logger.info("se creo carrito con exito");

            } catch {
                logger.error("error creando carrito para añadir producto");
                return "error creando carrito desde cero idcart vino null";

            }



        } else {

            console.log("Entro en el else");

            let cart = new Array();
            cart = await servicescarts.findbyID(idCart);
          
            console.log(cart);

            if (cart) {
                logger.info("carrito existe para agregar producto");
                console.log("imprimo cart");
                console.log(cart);
                try {
                    let product_find = await cart.Products.find(prod => prod.product == idProduct);
                    console.log(product_find);

                    if (product_find) {

                        logger.info("Producto existe en el carrito");

                        product_find.quantity += 1;

                        //const sum_quantity = quantity + 1; 

                        cart.save();
                        //console.log(cart); 

                    } else {

                        console.log("Entro al segundo else");
                        let quantity_init = 1;
                        logger.info("producto no existe en el carrito");

                        cart.Products.push({ product: idProduct, quantity: 1 });
                        cart.save();
                        console.log("Todo bien agregando producto al carrito");
                    }

                } catch {
                    logger.fatal("Una falla al buscar producto en el carrito");
                    return "Error buscando producto dentro de carrito";
                }

            } 


        }



    }

    async createcart() {

        console.log("Creo carro");

        try {
            const cart = await servicescarts.createnewcart();

            console.log(cart);
            logger.info("se creo carrito con exito");

            return cart;

        } catch {

            logger.fatal("Hubo una falla creando carrito");

        };


    }

    async deleteProduct(cid, pid) {

        console.log("Entro a borrar producto de carrito");

        console.log(cid);
        console.log(pid);

        //const deleteprod = await cartsModel.findOneAndUpdate({ "_id": cid}, { $pull: { "Products.product": { _id: pid } } });

        //const deleteprod = await cartsModel.findOneAndDelete({ "_id": cid}, { $pull: { "Products.product": { _id: pid } } });
        try {

            const deleteprod = await servicescarts.deleteproductfromcart(cid, pid);
            logger.info("se borro el producto del carrito de forma exitosa");
            return deleteprod;


        } catch {

            logger.fatal("no se pudo borrar producto del carrito")


        }


    }

    async updateCart(cid, pid, quantitybody) {

        console.log("Update carro");

        try {

            let updateprod = await servicescarts.updatecart(cid, pid, quantitybody);
            logger.info("se actualizo carrito con exito")
            return updateprod;

        } catch {

            logger.fatal("hubo un error actualizando el carrito");
        }


    }


    async getCartProducts(cid) {

        try {
            console.log("Entro a traer todos los productos del carrito con populate");

            console.log(cid);

            const populateCartprod = await servicescarts.getcartproducts(cid);

            logger.info("Se obtuvo productos del carrito con exito"); 

            return populateCartprod;

        } catch {

            logger.fatal("no se pudo traer productos del carrito"); 
        }

        


    }

    async deleteCart(cid) {

        try {
            console.log("Entro a eliminar carrito");

            console.log(cid);

            const populateCartprod = await servicescarts.deletecart(cid);

            logger.info("Se elimino carrito"); 

            return populateCartprod;

        } catch {

            logger.fatal("no se pudo eliminar carrito"); 
        }

        


    }


}


export default CartManagerMongo; //exportamos clase CartManagerMongo
