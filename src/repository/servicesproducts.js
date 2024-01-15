import { Router } from 'express';
import { usersModel } from '../dao/models/usermodels.js';
import { productsModel } from '../dao/models/productsmodels.js';
import passport from 'passport';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

class products {

    async create(title, description, price, thumbnail, code, stock, status, category, owner){
        
        console.log("Entre en el create"); 

        const produ = await productsModel.create({
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
            category,
            owner, 
        }); 
        
        console.log(produ); 
        return produ; 

    }

    async getallproducts(){
        const getprod = await productsModel.find().lean(); 

        return getprod; 
    }

    async getproducts(limit){

        const getprod = await productsModel.find({}).limit(limit).exec().lean();
        return getprod; 


    }

    async deleteproducts(idproduct, owner) {

        try { 
            const prodobj = await productsModel.findById({
                _id: idproduct,
            });

            const ownerprodu = prodobj.owner;

            if (ownerprodu === owner || ownerprodu === "admin" || ownerprodu === "ecommerce_admin@ecommerce.com"  || ownerprodu === "adminCoder@coder.com"){

                const delprod = await productsModel.deleteOne({
                    _id: idproduct,
                });
                return "Se borro correctamente el producto";

            }
            
         } catch {
            return "No se pudo borrar el producto"; 
         } 
    }

    async updateproducts (idproduct, element, value) {

        try { 
            let elemento = element;
            let updateprod = await productsModel.updateOne({
                "_id": idproduct,
              }, {
                $set: {
                  elemento : value
                }
              });
              return "Se actualizo correctamente el producto"
         } catch {
            return "No se pudo actualizar el producto"; 
         } 


    }


}

export default products;