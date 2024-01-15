import fs from 'fs';
import ProductManager from './ProductManager.js'; //importamos clase que gestiona productos

const productos = new ProductManager(); //instanciamos clase que maneja productos
const archivo = './src/carrito.json'; //definimos nombre y ruta del archivo

class CartManager {
  //declaramos propiedades de la clase 
  products = [];
  static idcart = 0; //variable estatica id del carrito


  constructor() { //constructor con elemento carrito arreglo vacio
    this.carts = []; //definimos arreglo vacio que guardara carritos
    this.path = archivo;
  }

  //Funcion para crear carritos
  async createCart() {

    const quantity = 1;
    let idObject = "";
    const listaVacia = [];

    const newCart = {
      productos: this.products,
      idcart: CartManager.idcart++
    }; //instanciamos objeto con propiedades que recibira del nuevo carrito

    const prodObject = []; //crea lista vacia para agregar nuevo producto

    try {
      if (!fs.existsSync(archivo)) { //verifica que el archivo exista


        newCart.productos = prodObject;

        listaVacia.push(newCart); //agrega nuevo carrito a objeto newCart

        await fs.promises.writeFile( //crea el archivo
          archivo,
          JSON.stringify(listaVacia, null, '\t') //agrega con un string lista de nuevo carrito
        );
      } else {

        const contenidoObj = await this.consultarCarrito(); //si existe el archivo llama función consultarCarrito que trae contenido del archivo

        newCart.productos = prodObject;

        contenidoObj.push(newCart); //agrega newCart a contenidoObj
        await fs.promises.writeFile(
          archivo,
          JSON.stringify(contenidoObj, null, '\t') //escribe en el archivo nuevo carrito tipo string
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async consultarCarrito() { //funcion que extrae contenido del archiva cada vez que se requiera
    const contenido = await fs.promises.readFile(archivo, 'utf-8');
    const contenidoObj = JSON.parse(contenido);
    return contenidoObj;
  }

  async readCarts() {
    const answer = await fs.promises.readFile(this.path, "utf-8");
    const ObjectAnswer = answer == '' ? [] : JSON.parse(answer);
    return ObjectAnswer;
  }

  async writeFile(allProducts) {
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(allProducts, null, '\t'))

  }

  async getcartByID(idfind) { //busqueda de carrito por ID

    try {
      if (!fs.existsSync(archivo)) { //valida que exista el archivo
        return console.log("El archivo no existe");
      } else {
        const contenidoObj = await this.consultarCarrito(); //se trae contenido del archivo

        if (contenidoObj.find((carrito) => carrito.idcart === idfind)) { //busca el ID del carrito en el contenido
          const carro = contenidoObj.find((carrito) => carrito.idcart === idfind);
          return carro.productos;

        } else {
          return "Not found"; //mensaje si no consigue el carrito
        }

      }
    } catch (error) {
      console.log(error);
    }

  }


  async addproductCart(idcar, idprod) { //Función que agrega productos al carrito

    const quantity = 1;
    let idObject = 0;

    const prodObject = {
      idObject,
      quantity
    };
    const carroproductos = [];
    const carroproductos2 = [];

    try {
      if (!fs.existsSync(archivo)) { //valida que exista el archivo
        return console.log("El archivo no existe");
      } else {
        
        const contenidoObj = await this.consultarCarrito(); //se trae contenido del archivo

        if (contenidoObj.find((carrito) => carrito.idcart === idcar)) { //busca el ID del carrito en el contenido
          const carro = contenidoObj.find((carrito) => carrito.idcart === idcar);

          const found = carro.productos; 

          console.log(found);

          console.log("Encontre carrito");

          console.log(typeof(found));

          console.log(carroproductos2); 
          
          const productfound = found.find((productocarrito) => productocarrito.idObject === idprod); //Busca dentro de carrito el producto
          
          console.log(productfound); 
          //-------------------------------//
          if (productfound) {

            console.log("Encontre producto");
            productfound.quantity = productfound.quantity + 1; //si consigue producto aumenta su valor de quantity

            carro.productos = found; 

            await fs.promises.writeFile(
              archivo,
              JSON.stringify(contenidoObj, null, '\t') //escribe en el archivo carrito con producto aumentado su quantity tipo string
            );



          } else {

            console.log("No lo encontre producto"); //no encontro producto en el carrito

            const carro = contenidoObj.find((carrito) => carrito.idcart === idcar);
            
            const filtered_carro = carro.productos.filter(item => item.idObject !== idprod);

            console.log(filtered_carro);

            prodObject.idObject = idprod; //crea nuevo objeto con datos del producto a agregar
            filtered_carro.push(prodObject); //agregamos producto a la lista de productos del carrito

            console.log(filtered_carro);
            carro.productos = filtered_carro; 

            await fs.promises.writeFile(
              archivo,
              JSON.stringify(contenidoObj, null, '\t') //escribe en el archivo nuevo carrito con nueva lista de productos tipo string
            );

          }

          return;

        } else {
          return "Not found"; //mensaje si no consigue el carrito
        }

      }
    } catch (error) {
      console.log(error);
    }

  }


}

 
export default CartManager; //exportamos clase CartManager



