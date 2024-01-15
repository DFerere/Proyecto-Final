import mongoose from "mongoose";

const cartsCollections = "carts"; 

const cartsSchema = new mongoose.Schema({


    Products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                }, 

                quantity: {
                    type: Number,
                    required: true
                }

            }
        ],
        default:[]
    },


})

const cartsModel = mongoose.model(cartsCollections, cartsSchema); 

export {cartsModel}; 
