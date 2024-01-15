import { Router } from 'express';
import { usersModel } from '../dao/models/usermodels.js';
import { cartsModel } from '../dao/models/cartsmodels.js';
import passport from 'passport';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

class carts {

    async create(idCart, idProduct, quantity_init){

        const cartcreate = await cartsModel.create({
            Products: {
                product: idProduct,
                quantity: quantity_init,
            }
        });

 

        return cartcreate; 

    }

    async findbyID(idCart){

        try {
            const cart = await cartsModel.findById({
                _id: idCart,
            });
    
            return cart;

        } catch{
            return "Error al buscar carrito"; 
        }

         

    }

    async createnewcart(){

        let cartobject = {};

        const cart = await cartsModel.create(cartobject);
        console.log(cart._id.toString());

        const stringcartid = cart._id;
        
        const cartid = stringcartid.toString();

        return cart; 

    }

    async deleteproductfromcart(cid, pid){

        const deleteprod = await cartsModel.findOneAndUpdate({ "_id": cid}, { $pull: { Products: { _id: pid } } });
        return deleteprod; 
    }

    async updatecart(cid, pid, quantitybody){

        let updateprod = await cartsModel.updateOne({
            "_id": cid,
            "Products.product": pid
          }, {
            $set: {
              "Products.$.quantity": quantitybody
            }
          }); 

        return updateprod; 

    }

    async getcartproducts(cid) {

        const populateCartprod = await cartsModel.find({_id : cid}).populate('Products.product').lean();
        return populateCartprod; 

    }

    async deletecart(cid) {

        const populateCartprod = await cartsModel.deleteOne({_id : cid});
        return populateCartprod; 

    }


}

export default carts;