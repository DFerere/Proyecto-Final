import fakerjs from '../repository/repositoryfakeproducts.js';

const faker = new fakerjs();


class productsfakermanager {

    async generator() {
        let products = [];

        for (let id = 1; id <= 100; id++) {

            const product = await faker.test();

            products.push({
                "id" : id, 
                product
            });
        }

        return products; 
    }


};

export default productsfakermanager;

