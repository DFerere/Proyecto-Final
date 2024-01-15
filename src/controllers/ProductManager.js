import fs from 'fs';
const archivo = './src/productos.json'; //definimos nombre y ruta del archivo

class ProductManager {
  //declaramos propiedades de la clase 
  title;
  description;
  price;
  thumbnail;
  code;
  stock;
  static id = 0; //variable estatica id del producto


  constructor() { //constructor con elemento product arreglo vacio
    this.products = []; //definimos arreglo vacio que guardara productos
    this.path = archivo;
  }

  //Funcion para agregar productos
  async addProduct2(title, description, price, thumbnail, code, stock, status, category) {

    const newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status, 
      category, 
      id: ProductManager.id++
    }; //instanciamos objeto con propiedades que recibira del nuevo producto

    try {
      if (!fs.existsSync(archivo)) { //verifica que el archivo exista
        const listaVacia = []; //crea lista vacia para agregar nuevo producto
        listaVacia.push(newProduct); //agrega nuevo producto a objeto newproduct

        await fs.promises.writeFile( //crea el archivo
          archivo,
          JSON.stringify(listaVacia, null, '\t') //agrega con un string lista de nuevo producto
        );
      } else {
        const contenidoObj = await this.consultarProducto(); //si existe el archivo llama función consultarProducto que trae contenido del archivo

        const existingProduct = contenidoObj.find(prod => prod.code === code); //valida que el codigo del producto nuevo no exista 
        if (existingProduct) { //Valida que no existe previamente el mismo codigo
          console.log("Codigo de objeto ingresado ya existe");
          return;
        }

        for (const [key, value] of Object.entries(newProduct)) { //valida que los campos no sean vacios
          if (key !== 'id' && key !== 'thumbnail' && !value) {
            console.log(`La propiedad '${key}' del objeto ingresado está vacía, verifique que todos los campos estén completados`);
            return;
          }
        }

        contenidoObj.push(newProduct); //agrega newProduct a contenidoObj
        await fs.promises.writeFile(
          archivo,
          JSON.stringify(contenidoObj, null, '\t') //escribe en el archivo nuevo producto tipo string
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async consultarProducto() { //funcion que extrae contenido del archiva cada vez que se requiera
    const contenido = await fs.promises.readFile(archivo, 'utf-8');
    const contenidoObj = JSON.parse(contenido);
    return contenidoObj;
  }

  async readProducts() { //función alternativa que lee contenido del alchivo productos.json
    const answer = await fs.promises.readFile(this.path, "utf-8");
    const ObjectAnswer = answer == '' ? [] : JSON.parse(answer);
    return ObjectAnswer;
  }

  async writeFile(allProducts) { //función que reescribe en el archivo contenido deseado 
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(allProducts, null, '\t'))

  }

  async getProducts() { //función que obtiene lista de prodcutos registrada
    try {
      if (!fs.existsSync(this.path)) {
        await this.writeFile(this.products);
      }
      const arrayProducts = await this.readProducts();

      return arrayProducts

    } catch (error) {
      /*Manejo de errores */
      throw new Error(error);
    }
  }

  async getproductByID(idfind2) { //busqueda de productos por ID
    const idfind = idfind2.id; 
    try {
      if (!fs.existsSync(archivo)) { //valida que exista el archivo
        return console.log("El archivo no existe");
      } else {
        const contenidoObj = await this.consultarProducto(); //se trae contenido del archivo
        console.log(contenidoObj);

         
        if (contenidoObj.find((produ) => produ.id === parseInt(idfind, 10))) { //busca el ID del producto en el contenido
          const contprod = contenidoObj.find((produ) => produ.id === parseInt(idfind, 10));
          console.log("entro en el if"); 
          console.log(contprod); 
          return contprod;
        } else {
          console.log("entro en el else"); 
          return "Not found"; //mensaje si no consigue el producto
        }

      }
    } catch (error) {
      console.log(error);
    }

  }

  async updateproductByID(idfind, title, description, price, thumbnail, code, stock, status, category) { //update de productos por ID

    const dateProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category
    }; //definimos nuevo objeto vacio con propiedades del producto que posiblemente se modifiquen


    try {
      if (!fs.existsSync(archivo)) { //se valida que exista el archivo
        return console.log("El archivo no existe");
      } else {
        const contenidoObj = await this.consultarProducto(); //se trae contenido del archivo si existe

        if (contenidoObj.find((produ) => produ.id === idfind)) { //se busca el Id del producto ingresado

          const updatedprod = contenidoObj.find((produ) => produ.id === idfind); //se trae objeto del producto buscado

          for (const [key, value] of Object.entries(dateProduct)) { //valida que los campos ingresado no sean vacios
            if (value) { //si no es vacio significa que el usuario envio un valor que desea modificar de una propiedad del producto
              updatedprod[key] = value;
            }
          }

          contenidoObj.idfind = updatedprod; //el producto del ID ingresado se cambio por el producto modificado en el contenidoObj

          let contenidoObjstring = JSON.stringify(contenidoObj, null, '\t'); //se convierte contenidoObj a string

          fs.writeFileSync(archivo, contenidoObjstring, function (err) { //se agrega al archivo
            if (err) throw err;
            console.log('Producto modificado!');
          });


        } else {
          return "No consegui producto con ese ID"; //error se ID de producto ingresado no existe
        }

      }
    } catch (error) {
      console.log(error);
    }

  }

  async deleteproductByID(idfind) { //metodo para eliminar productos por ID
    const idfind2 = idfind.id; 
    const product = await this.consultarProducto(); //trae contenido del archivo
    const productSinId = product.filter((prod) => prod.id != idfind2); //filtra producto con el ID ingresado
    await fs.promises.writeFile(
      archivo,
      JSON.stringify(productSinId, null, '\t') //escribe objeto sin producto del ID ingresado en el archivo en formato string
    );

  }

}
export default ProductManager;



