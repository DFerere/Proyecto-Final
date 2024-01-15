import EErrors from "../repository/errors/EErrors.js";

export default (error, req, res, next) => {

    console.log(error.cause); 
    switch(error.code){
        case EErrors.INVALID_TYPE_ERROR:
            res.send({status:"error", error:error.name}); 
            break; 
            
        default:
            res.send({status:"error", error:"Error no manejado"})
            //res.send("Error no manejado"); 

    }


}
