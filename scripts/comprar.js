//URL DE LA API DE GOOGLE CON LA INFORMACIÓN DE LOS LIBROS
const api_url_info = "https://www.googleapis.com/books/v1/volumes";
// Parámetros iguales a todas las llamadas:
const orderBy = "relevance";
const lang = "en";
const limit = "12";
const parametros = `&orderBy=${orderBy}&langRestrict=${lang}&maxResults=${limit}`;

cargarInformacionCompra();

/**
 * Función que se encarga de cargar la información necesaria para simular una compra.
 * @returns {void}
 */
function cargarInformacionCompra() {
    const urlParams = new URLSearchParams(window.location.search);
    const busqueda = urlParams.get('q');
    console.log(busqueda);
    
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
 * Realiza una solicitud a la API de Google Books para obtener la información de un libro específico por su ID.
 * @param {string} id El ID único del libro que se desea obtener.
 * @returns {Promise<Object>} Una promesa que resuelve con los datos del libro obtenidos de la API.
 */
async function obtenerLibro(id) {
    try {
        const urlLibro = `${api_url_info}/${id}`;
        const respuesta = await fetch(urlLibro);
        if (!respuesta.ok) {
          throw "Ocurrió un error durante la llamada a la API";
        }
    
        const libro = await respuesta.json();
        return libro;
      } catch (error) {
        console.log(error);
      }
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

  /**
 * Crea una tarjetas visuale para mostrar el libro en la interfaz.
 * @param {Array} libros Array de objetos que representan los libros a mostrar.
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
 * Mapea un objeto de libro obtenido de la API en un formato específico para la aplicación.
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
 * Convierte una cadena de texto que contiene código HTML en un objeto de documento HTML.
 * @param {string} html La cadena de texto que contiene el código HTML a convertir.
 * @param {boolean} trim Indica si se deben recortar los espacios en blanco del principio y el final del HTML (opcional, por defecto es true).
 * @returns {Document} Un objeto Document que representa el HTML convertido.
 */
function convertirStringACodigoHTML(html, trim = true) {
    // Procesa el string a HTML.
    html = trim ? html.trim() : html;
    if (!html) return null;
  
    // Crea un nuevo template.
    const template = document.createElement("template");
    template.innerHTML = html;
    const result = template.content.children;
  
    // Devuelve el HTML o un HTML Collection.
    if (result.length === 1) return result[0];
    return result;
}

/**
 * Simula la compra de un libro y muestra un mensaje de éxito.
 * @returns {void}.
 */
function comprar() {
    document.getElementById("compra").replaceChildren();
    mostrarMensaje("¡Compra realizada con éxito!");
}

// Para simular una compra, se captura el envío del formulario para mostrar un mensaje de éxito una vez que todos los campos se completaron correctamente.
window.addEventListener("DOMContentLoaded", function() {
    document.getElementById('formulario-compra').addEventListener("submit", function(e) {
        e.preventDefault();
        comprar();
    })
});