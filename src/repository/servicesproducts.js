import { Router } from 'express';
import { usersModel } from '../dao/models/usermodels.js';
import { productsModel } from '../dao/models/productsmodels.js';
import passport from 'passport';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import user from './servicesuser.js'; 
import mailing from '../services/email.js';

dotenv.config();

const users = new user(); 
const sendmail = new mailing(); 

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

    async findproducts(productid){
        const getprod = await productsModel.findById({ _id : productid}); 

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

            const userprod = await users.find(owner); 

            if(userprod.rol == "premium") {

                await sendmail.deleteprodmailing( idproduct, owner); 


            }

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