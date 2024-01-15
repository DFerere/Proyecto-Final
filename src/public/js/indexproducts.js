

const socket = io();

socket.emit('message', "Hola, soy el cliente de la vista de productos")
socket.on('dataserver', data => {
    console.log(data);
})

socket.on('product', data => {
    console.log(data);
    actualizarCatalogo(data);
})


function actualizarCatalogo(data) {
    let contenidocambiante = ""
    //const con = data; 
    let catalogo = document.getElementById("catalogo");
   
    data.forEach(({ title, description, price, thumbnail, code, stock, category, _id }) => {
        contenidocambiante += `  <div>
       <h1>Lista de productos:</h1>
         <div>
           <h2>$${title}</h2>
           <h3>Descripcion:</h3>
           <p>${description}</p>
           <h3>Precio:</h3>
           <p>${price}</p>
           <h3>Url:</h3> 
           <p>${thumbnail}</p>
           <h3>Codigo:</h3>
           <p>${code}</p>
           <h3>En stock:</h3>
           <p>${stock}</p> 
           <h3>Categoria:</h3>
           <p>${category}$</p>
           <button id="botonagregar-${_id}">AGREGAR AL CARRITO</button>
           </div>
      </div>`


    });


    catalogo.innerHTML = contenidocambiante;

    console.log(contenidocambiante); 

    botonesCatalogo(data);
};

const botonesCatalogo = (data) => {
    for (const producto of data) {
        const botonId = `botonagregar-${producto._id}`;
         
        const botonNodo = document.getElementById(botonId);

  

        botonNodo.addEventListener("click", () => {

            const cartid = document.getElementById('cartid').innerHTML;
   
            console.log(cartid); 

            let idproduct = producto._id;
            console.log("Imprimo iproduct");

            console.log("ESTAMOS EN INDEXPRODUCTS"); 

           socket.emit('addproductCarrito', {
                cartid,
                idproduct,
            })

        });
    }
};
