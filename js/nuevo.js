// sumar objetos al html (en este caso tarjetas de objetos para venta)
/**********************
 *     ENTIDADES 
 **********************/

class card {

    constructor({
        imagen,
        marca,
        nombrePerfume,
        precioPerfume,

    }) {
        this.imagen = imagen;
        this.marca = marca;
        this.nombrePerfume = nombrePerfume;
        this.precioPerfume = precioPerfume;
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
        nombre: document.getElementById("nombrePerfume").value,
        precio: document.getElementById("precioPerfume").value,
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
        <h3>${obj.nombrePerfume}</h3>
        <h4>$${obj.precioPerfume}</h4>
      </div>
        `
    });
}

/**********************
 *     EVENTOS 
 **********************/
const nuevo = document.querySelectorAll('#nuevo')

nuevo.addEventListener("click", () => {
    guardarEnBaseDeDatos()
})

if (localStorage.getItem("listaDeco") != null) {
    imprimirDatos()
}


const loadFile = function (event) {
    let image = document.getElementById('output');
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