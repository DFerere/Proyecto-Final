import fakerjs from '../dao/models/productsfakermodels.js';

const fakerprod = new fakerjs();


class fakerjs_service {

    async test() {

        const productsfake = await fakerprod.fakermodel(); 
        return productsfake; 
    }


};

export default fakerjs_service;

