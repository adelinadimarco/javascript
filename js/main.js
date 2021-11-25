/////////////////////////
//     BURGER MENU
////////////////////////

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

///////////////////////
//    VARIABLES
//////////////////////

let carrito = document.querySelectorAll('.sumarACarrito');

let productos = [{
        name: "Grey Tshirt",
        tag: "greytshirt",
        price: 15,
        inCart: 0
    },
    {
        name: "Grey Hoddie",
        tag: "greyhoddie",
        price: 20,
        inCart: 0
    },
    {
        name: "Black Tshirt",
        tag: "blacktshirt",
        price: 15,
        inCart: 0
    },
    {
        name: "Black Hoddie",
        tag: "blackhoddie",
        price: 20,
        inCart: 0
    }
];

for (let i = 0; i < carrito.length; i++) {
    carrito[i].addEventListener("click", () => {
        numeroIcono(productos[i]);
        costoTotal(productos[i])
    })
}

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

function setItem(producto) {
    let cartItems = localStorage.getItem("productosEnCarro")
    cartItems = JSON.parse(cartItems)

    if (cartItems != null) {

        if (cartItems[producto.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [producto.tag]: producto
            }
        }

        cartItems[producto.tag].enCarrito += 1;
    } else {
        producto.enCarrito = 1;
        cartItems = {
            [producto.tag]: producto
        }
    }

    localStorage.setItem("productosEnCarro", JSON.stringify(cartItems))
}

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


function displayCarrito() {
    let cartItems = localStorage.getItem("productosEnCarro");
    cartItems = JSON.parse(cartItems);

    let containerProductos = document.querySelector(".productos");
    let costoTotal = localStorage.getItem("costoTotal");

    if (cartItems && containerProductos) {
        containerProductos.innerHTML = "";
        Object.values(cartItems).map(item => {
            containerProductos.innerHTML += `
        
        <div class="producto" >
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

        <div class=total >$${item.enCarrito * item.precio}.00</div>
        `

        });

        //Total de todo el carrito

        containerProductos.innerHTML +=
            `<div class=containerSumaTotal>
     <h4 class= textoSuma>
     Total Productos    
     </h4>
     
     <h4 sumaProductos> 
     $${costoTotal},00 </h4>        
     </div>
     `

        deleteButtons();
        manageQuantity();
    }
}



function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for (let i = 0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g, '').trim();
            console.log(currentProduct);

            if (cartItems[currentProduct].inCart > 1) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g, '').trim();
            console.log(currentProduct);

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product ion-icon');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    console.log(cartItems);

    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g, '').trim();

            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - (cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}

cargarNumeroCarrito();
displayCarrito();