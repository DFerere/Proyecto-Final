import mongoose from "mongoose";

import mongoosePaginate from "mongoose-paginate-v2"; 

const tokenCollections = "tokens"; 

const tokenSchema = new mongoose.Schema({

    email : String, 
    tokenvalue: String,
    timestamp: Number, 
})

tokenSchema.plugin(mongoosePaginate); 
const tokenModel = mongoose.model(tokenCollections, tokenSchema); 

export {tokenModel};