// para función de carrito e-commerce
//    VARIABLES

let carrito = document.querySelectorAll('.sumarACarrito');

let productos = [{
        nombre: "Armani Pour Homme",
        tag: "armanipourhomme",
        precio: 5000,
        enCarrito: 0
    },
    {
        name: "Givenchy L'Interdit",
        tag: "givenchylinterdit",
        price: 4500,
        enCarrito: 0
    },
    {
        name: "Dior Diorissimo",
        tag: "diorissimo",
        price: 6000,
        enCarrito: 0
    },
    {
        name: "Narciso Rodriguez For Her",
        tag: "nrforher",
        price: 5500,
        enCarrito: 0
    },
    {
        name: "Hermés Le Jardin Sur La Lagune",
        tag: "hermes",
        price: 6500,
        enCarrito: 0
    },
    {
        name: "Armani Sí",
        tag: "armanisi",
        price: 3500,
        enCarrito: 0
    },
    {
        name: "Chanel N°5",
        tag: "chanel5",
        price: 5800,
        enCarrito: 0
    },
    {
        name: "Dior J'Adore",
        tag: "jadore",
        price: 4800,
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

        if (itemEnCarrito [producto.tag] == undefined) {
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
        Object.values(itemEnCarrito).map((item) => {
            containerProductos.innerHTML += `

        <div class="productoAlCarrito">
          <ion-icon name="close-circle"></ion-icon>
             <img src="./assets/${item.tag}.jpg" />
             <span>${item.nombre}</span>
        </div>  
        
        <div class="precio">$${item.precio}</div>
        
        <div class="cantidad">       
          <ion-icon name="remove-circle"></ion-icon>
             ${item.enCarrito}
          <ion-icon name="add-circle"></ion-icon>
        </div>

        <div class="total">$${item.enCarrito * item.precio}</div>
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
        botonBorrar();
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
    let botonBorrar = document.querySelectorAll('.productoAlCarrito ion-icon');
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