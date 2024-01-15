import mongoose from "mongoose";

const ticketCollections = "tickets"; 

const ticketSchema = new mongoose.Schema({

    code: {
        type: String,
        required: true
    },

    purchase_datetime: {
        type: Date,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    purchaser: {
        type: String,
        required: true
    },

})

const ticketModel = mongoose.model(ticketCollections, ticketSchema); 

export {ticketModel}; 