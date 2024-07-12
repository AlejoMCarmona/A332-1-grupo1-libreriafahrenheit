cargarInformacionCompra();

// Para simular una compra, se captura el envío del formulario para mostrar un mensaje de éxito una vez que todos los campos se completaron correctamente.
window.addEventListener("DOMContentLoaded", function() {
    document.getElementById('formulario-compra').addEventListener("submit", function(e) {
        e.preventDefault();
        comprar();
    })
});

/**
 * Función que se encarga de cargar la información necesaria para simular una compra.
 * @returns {void}
 */
function cargarInformacionCompra() {
    const urlParams = new URLSearchParams(window.location.search);
    const busqueda = urlParams.get('q');
    
    if(typeof busqueda !== 'undefined' && busqueda !== null)
    {
        id = busqueda.replace(/\s/g, "+");;
        obtenerLibro(id)
        .then(libro => {
            if (libro == null) {
                mostrarMensaje("No se pudo encontrar el libro solicitado.");
            } else {
                crearCard(libro);
            }
        });
    }
    else
    {
        window.location.replace("libros.html");
    }
}

  /**
 * Crea una tarjeta visual para mostrar el libro en la página de compras.
 * @param {Object} libro a mostrar.
 * @returns {void}
 */
  function crearCard(libro) {
    let libroMappeado = mappearLibro(libro);
    let cardLibro = convertirStringACodigoHTML(
        `
        <div class="card pt-3 mt-md-0 mt-4 w-100 col">
            <img src="${libroMappeado.urlImagen}" class="card-img-top mx-auto" alt="...">
            <div class="informacion-libro mx-auto d-flex flex-column">
                <div class="card-body">
                    <h5 class="card-title">${libroMappeado.titulo}</h5>
                    <p class="card-text">${libroMappeado.autores}</p>
                    <p class="card-text">${libroMappeado.descripcion}</p>
                    <p class="card-text">${libroMappeado.precio}</p>
                </div>
            </div>
        </div>
        `
        );

        document.getElementById("cont-card-compra").appendChild(cardLibro);
}

/**
 * Mapea un objeto de libro obtenido de la API en un formato específico para mostrarlo en la página de "compras".
 * @param {Object} libroAPI Objeto que representa un libro obtenido de la API.
 * @returns {Object} Objeto de libro mapeado en el formato deseado para la aplicación.
 */
function mappearLibro(libroAPI) {
    console.log(libroAPI.saleInfo);
    let precio = "";
    let moneda = ""; 
    if (libroAPI.saleInfo.saleability == "FOR_SALE") {
        precio = libroAPI.saleInfo.listPrice.amount;
        moneda = libroAPI.saleInfo.listPrice.currencyCode;
    } else {
        precio = Math.floor(Math.random() * 21);
        moneda = "USD";
    }
    return {
      id: libroAPI.id,
      titulo: libroAPI.volumeInfo.title,
      descripcion: libroAPI.volumeInfo.description != undefined ? libroAPI.volumeInfo.description : "Este libro no posee descripción. Lo sentimos :(",
      precio: "$" + precio + "" + moneda,
      autores: libroAPI.volumeInfo.authors != undefined ? libroAPI.volumeInfo.authors.toString() : "Anonimo",
      urlImagen: libroAPI.volumeInfo.imageLinks != null ? libroAPI.volumeInfo.imageLinks.thumbnail : "../images/no_image.jpg",
    };
}

/**
 * Muestra un mensaje en la página.
 * @returns {void}
 */
function mostrarMensaje(mensaje) {
    const mensajeHTML = convertirStringACodigoHTML(
        `<h3 class="text-center mt-4">${mensaje}</h3>`
    );
    document.getElementById("compra").appendChild(mensajeHTML);
}