// sumar objetos al html (en este caso tarjetas de objetos para venta)
/**********************
 *     ENTIDADES 
 **********************/

class card {

    constructor({
        imagen,
        marca,
        nombre,
        precio,
        
    }) {
        this.imagen = imagen;
        this.marca = marca;
        this.nombre = nombre;
        this.precio = precio;
    }
}

/**********************
 *     VARIABLES 
 **********************/

let listaDeco = [];

/**********************
 *     FUNCIONES 
 **********************/

//Funcion de crear Tarjeta 
const crearTarjeta = () => {

    const tarjeta = new card({
        imagen: document.getElementById("imagen").files[0].name,
        marca: document.getElementById("marca").value,       
        nombre: document.getElementById("nombre").value,
        precio: document.getElementById("precio").value,
    })

    let lista;

    if (localStorage.getItem("listaDeco") != null) {
        lista = JSON.parse(localStorage.getItem("listaDeco"))
        lista.push(tarjeta)
        localStorage.setItem("listaDeco", JSON.stringify(lista))
    }

    listaDeco.push(tarjeta)

    return tarjeta

}

//Funcion de Guardar Datos
const guardarEnBaseDeDatos = () => {

    crearTarjeta()

    if (verificarStorage() != undefined) {
        localStorage.setItem("listaDeco", JSON.stringify(verificarStorage()))
    } else {
        localStorage.setItem("listaDeco", JSON.stringify(listaDeco))
    }
}

//Funcion de Verificar Storage
//Return Array
const verificarStorage = () => {

    let dato = [];

    if (localStorage.getItem("listaDeco") != null) {
        dato = JSON.parse(localStorage.getItem("listaDeco"))

        return dato
    }
}

//Funcion de Imrimir Datos
const imprimirDatos = () => {

    let indice = 0

    verificarStorage().forEach(obj => {

        document.getElementById("nuevoPerfume").innerHTML += `
      <div>
        <img>${obj.imagen}</img>
        <h3>${obj.marca}</h3>
        <h3>${obj.nombre}</h3>
        <h4>$${obj.precio}</h4>
      </div>
        `
    });
}

/**********************
 *     EVENTOS 
 **********************/
document.getElementById("nuevo").addEventListener("click", () => {
    guardarEnBaseDeDatos()
})

if (localStorage.getItem("listaDeco") != null) {
    imprimirDatos()
}


var loadFile = function(event) {
	var image = document.getElementById('output');
	image.src = URL.createObjectURL(event.target.files[0]);
};

// para menú hamburguesa
/////////////////////////
//     BURGER MENU

// variables
const menuBoton = document.querySelector('.menuBoton');

let menuOpen = false;

const dropdown = document.querySelector('.dropdown-menu ul');

// eventos
menuBoton.addEventListener('click', () => {
    if (!menuOpen) {
        menuBoton.classList.toggle('open');
        menuOpen = true;

    } else {
        menuOpen = false;
    }
})

// para función de carrito e-commerce
////////////////////////////////////
//    VARIABLES

let carrito = document.querySelectorAll('.sumarACarrito');

let productos = [{
    nombre: "Armani Pour Homme",
    tag: "armanipourhomme",
    precio: 2000,
    enCarrito: 0
    },
    {
        name: "Givenchy L'Interdit",
        tag: "givenchylinterdit",
        price: 20,
        enCarrito: 0
    },
    {
        name: "Dior Diorissimo",
        tag: "diorissimo",
        price: 15,
        enCarrito: 0
    },
    {
        name: "Narciso Rodriguez For Her",
        tag: "nrforher",
        price: 20,
        enCarrito: 0
    },
{
        name: "Hermés Le Jardin Sur La Lagune",
        tag: "hermes",
        price: 15,
        enCarrito: 0
    },
    {
        name: "Armani Sí",
        tag: "armanisi",
        price: 20,
        enCarrito: 0
    },
        name: "Chanel N°5",
        tag: "chanel5",
        price: 15,
        enCarrito: 0
    },
    {
        name: "Dior J'Adore",
        tag: "jadore",
        price: 20,
        enCarrito: 0
    }
];

for (let i = 0; i < carrito.length; i++) {
    carrito[i].addEventListener("click", () => {
        numeroIcono(productos[i]);
        costoTotal(productos[i])
    })
}

// funciones para sumar cantidad en el ícono del carrito
function cargarNumeroCarrito() {
    let cantidadProductos = localStorage.getItem('numeroIcono');
    if (cantidadProductos) {
        document.querySelector('.bag span').textContent = cantidadProductos;
    }
}

function numeroIcono(producto) {
    // console.log(" a vergaston ", producto)
    let cantidadProductos = localStorage.getItem("numeroIcono");

    cantidadProductos = parseInt(cantidadProductos);

    if (cantidadProductos) {
        localStorage.setItem("numeroIcono", cantidadProductos + 1);
        document.querySelector(".bag span").textContent = cantidadProductos + 1;
    } else {
        localStorage.setItem("numeroIcono", 1);
        document.querySelector(".bag span").textContent = 1;
    }
    setItem(producto);
}

// función de agregar items a carrito
function setItem(producto) {
    let itemEnCarrito = localStorage.getItem("productosEnCarrito")
    itemEnCarrito = JSON.parse(itemEnCarrito)

    if (itemEnCarrito != null) {

        if (itemEnCarrito[producto.tag] == undefined) {
            itemEnCarrito = {
                ...itemEnCarrito,
                [producto.tag]: producto
            }
        }

        itemEnCarrito[producto.tag].enCarrito += 1;
    } else {
        producto.enCarrito = 1;
        itemEnCarrito = {
            [producto.tag]: producto
        }
    }

    localStorage.setItem("productosEnCarrito", JSON.stringify(itemEnCarrito))
}

// función para calcular el costo total del carrito
function costoTotal(producto) {

    let costoTotal = localStorage.getItem("costoTotal")

    console.log("el costo total es", costoTotal);
    console.log(typeof costoTotal);

    if (costoTotal != null) {
        costoTotal = parseInt(costoTotal);
        localStorage.setItem("costoTotal", costoTotal + producto.precio);
    } else {
        localStorage.setItem("costoTotal", producto.precio)
    }
}

// función para inyectar html en carrito.html
function displayCarrito() {
    let itemEnCarrito = localStorage.getItem("productosEnCarrito");
    itemEnCarrito = JSON.parse(itemEnCarrito);

    let containerProductos = document.querySelector(".productos");
    let costoTotal = localStorage.getItem("costoTotal");

    if (itemEnCarrito && containerProductos) {
        containerProductos.innerHTML = "";

      // se inyectan los productos en html       
      Object.values(itemEnCarrito).map(item => {
            containerProductos.innerHTML += `
     
        <div class="producto">
        <ion-icon name="close-circle"></ion-icon>
        <img src="./assets/${item.tag}.png">
        <span>${item.nombre}</span>
        </div>  
        <div class=precio>$${item.precio}</div>
        <div class=cantidad>
        <ion-icon name="remove-circle"></ion-icon>
        ${item.enCarrito}
        <ion-icon name="add-circle"></ion-icon>
        </div>
        <div class=total >$${item.enCarrito * item.precio}0</div>
        `
        });

      // se inyectan los costos totales en html

        containerProductos.innerHTML +=
     `<div class=containerSumaTotal>
     <h4 class= textoSuma>
     Total Productos    
     </h4>
     
     <h4 class="sumaProductos"> 
     $${costoTotal}</h4>        
     </div>
     `

        botonesBorrar();
        botonesCantidad();
    }
}

// configuracion de botones para mas y menos
function botonesCantidad() {
    let menosBoton = document.querySelectorAll('.menos');
    let masBoton = document.querySelectorAll('.mas');
    let cantidadActual = 0;
    let productoActual = '';
    let itemEnCarrito = localStorage.getItem('productosEnCarrito');
    itemEnCarrito = JSON.parse(itemEnCarrito);

    for (let i = 0; i < masBoton.length; i++) {
        menosBoton[i].addEventListener('click', () => {
            console.log(itemEnCarrito);
            cantidadActual = menosBoton[i].parentElement.querySelector('span').textContent;
            console.log(cantidadActual);
            productoActual = menosBoton[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g, '').trim();
            console.log(productoActual);

            if (itemEnCarrito[productoActual].inCart > 1) {
                itemEnCarrito[productoActual].inCart -= 1;
                numeroIcono(itemEnCarrito[productoActual], "decrease");
                costoTotal(itemEnCarrito[productoActual], "decrease");
                localStorage.setItem('productosEnCarrito', JSON.stringify(itemEnCarrito));
                displayCarrito();
            }
        });

        masBoton[i].addEventListener('click', () => {
            console.log(itemEnCarrito);
            cantidadActual = masBoton[i].parentElement.querySelector('span').textContent;
            console.log(cantidadActual);
            productoActual = masBoton[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g, '').trim();
            console.log(productoActual);

            itemEnCarrito[productoActual].enCarrito += 1;
            numeroIcono(itemEnCarrito[productoActual]);
            costoTotal(itemEnCarrito[productoActual]);
            localStorage.setItem('productosEnCarrito', JSON.stringify(itemEnCarrito));
            displayCarrito();
        });
    }
}

// boton para borrar
function botonBorrar() {
    let botonBorrar = document.querySelectorAll('.producto ion-icon');
    let cantidadProductos = localStorage.getItem('numeroIcono');
    let costoCarrito = localStorage.getItem("costoTotal");
    let numeroIcono = localStorage.getItem('productosEnCarrito');
    numeroIcono = JSON.parse(numeroIcono);
    let productoNombre;
    console.log(numeroIcono);

    for (let i = 0; i < botonBorrar.length; i++) {
        botonBorrar[i].addEventListener('click', () => {
            productName = botonBorrar[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g, '').trim();

            localStorage.setItem('numeroIcono', cantidadProductos - numeroIcono[productoNombre].enCarrito);
            localStorage.setItem('costoTotal', costoCarrito - (numeroIcono[productoNombre].precio * numeroIcono[productoNombre].enCarrito));

            delete numeroIcono[productoNombre];
            localStorage.setItem('productosEnCarrito', JSON.stringify(numeroIcono));

        })
    }
}

// se llama a funciones
cargarNumeroCarrito();
displayCarrito();
