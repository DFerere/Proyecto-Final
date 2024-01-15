import { faker } from '@faker-js/faker/locale/es_MX';



class fakerjs {

    

    async fakermodel() {


        const name = faker.commerce.productName();
        const productDescription = faker.commerce.productDescription();
        const price = faker.commerce.price();
        const category = faker.commerce.department(name);
        const code = faker.commerce.isbn();
        const stock = faker.number.int({ max: 1000 }); 
        const thumbnail = faker.internet.url(); 
         

        const fakeproduct = {
            name, 
            productDescription, 
            price,
            thumbnail, 
            code,
            stock,
            category    
        };

        return fakeproduct; 
    }


};

export default fakerjs;

