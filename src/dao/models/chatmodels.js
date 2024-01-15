import mongoose from "mongoose";

const chatCollections = "chat"; 

const chatSchema = new mongoose.Schema({

    correo: {
        type: String,
        required: true
    },

    mensaje: {
        type: String, 
        required: true
    },
})

const chatModel = mongoose.model(chatCollections, chatSchema); 

export {chatModel}; 