//URL DE LA API DE GOOGLE CON LA INFORMACIÓN DE LOS LIBROS
const api_url_info = "https://www.googleapis.com/books/v1/volumes";

// Parámetros iguales a todas las llamadas:
const orderBy = "relevance";
const lang = "en";
const limit = "12";
const parametros = `&orderBy=${orderBy}&langRestrict=${lang}&maxResults=${limit}`;

realizarBusqueda();

/**
 * Realiza una busqueda por título tomando el mismo de los query params.
 * Si existe un query params válido, actualiza la interfaz con los libros obtenidoss.
 * Si el query params no es válido, se redirige hacia la página de libros.
 * @returns {void}
 */
function realizarBusqueda() {
    const urlParams = new URLSearchParams(window.location.search);
    const busqueda = urlParams.get('q');
    console.log(busqueda);
    
    if(typeof busqueda !== 'undefined' && busqueda !== null)
    {
        nombre = busqueda.replace(/\s/g, "+");;
        obtenerLibrosPorNombre(nombre)
        .then(libros => {
            if (libros.totalItems == 0) {
                mostrarMensaje("No se pudieron encontrar libros que coincidan con su busqueda");
            } else {
                crearCards(libros);
            }
        });
    }
    else
    {
        window.location.replace("prueba.html");
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
    document.getElementById("cont_carga").appendChild(mensajeHTML);
}

/**
 * Realiza una solicitud a la API de Google Books para obtener libros basados en un título especificado.
 * @param {string} tituloBuscado El título por el cual se buscarán los libros.
 * @returns {Promise<Object>} Una promesa que resuelve con los libros obtenidos del título buscado.
 */
async function obtenerLibrosPorNombre(tituloBuscado) {
    try {
      const urlConTitulo = `${api_url_info}?q=intitle:${tituloBuscado}${parametros}`;
      const respuesta = await fetch(urlConTitulo);
      if (!respuesta.ok) {
        throw "Ocurrió un error durante la llamada a la API";
      }
  
      const libros = await respuesta.json();
      return libros;
    } catch (error) {
      console.log(error);
    }
}

  /**
 * Crea tarjetas visuales para mostrar los libros en la interfaz.
 * @param {Array} libros Array de objetos que representan los libros a mostrar.
 * @returns {void}
 */
  function crearCards(libros) {
    libros.items.forEach((libro) => {
        let libroMappeado = mappearLibro(libro);
        let cardLibro = convertirStringACodigoHTML(
            `<div class="card pt-3 mt-md-0 mt-4 animate__animated animate__headShake">
                <img src="${libroMappeado.urlImagen}" class="card-img-top img-responsive mx-auto" alt="...">
                <div class="informacion-libro mx-auto d-flex flex-column">
                    <div class="card-body">
                        <h5 class="card-title">${libroMappeado.titulo}</h5>
                        <p class="card-text">${libroMappeado.autores}</p>
                    </div>
                </div>
                <div class="mt-auto mb-3 text-center">
                    <a href="#" class="btn btn-warning fs-6 w-75">Comprar</a>
                </div>
            </div>`
        );
    
        document.getElementById("cont_carga").appendChild(cardLibro);
    });
}

/**
 * Mapea un objeto de libro obtenido de la API en un formato específico para la aplicación.
 * @param {Object} libroAPI Objeto que representa un libro obtenido de la API.
 * @returns {Object} Objeto de libro mapeado en el formato deseado para la aplicación.
 */
function mappearLibro(libroAPI) {
    return {
      id: libroAPI.id,
      titulo: libroAPI.volumeInfo.title,
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