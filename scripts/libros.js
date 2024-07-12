//URL DE LA API DE GOOGLE CON LA INFORMACIÓN DE LOS LIBROS
const api_url_info = "https://www.googleapis.com/books/v1/volumes";

// Parámetros iguales a todas las llamadas:
const orderBy = "relevance";
const lang = "en";
const limit = "12";
const parametros = `&orderBy=${orderBy}&langRestrict=${lang}&maxResults=${limit}`;

// Primera llamada. Por defecto el primer genero mostrado es "Ciencia Ficción".
cambiarGenero('science:fiction');

/**
 * Cambia el género seleccionado y actualiza la interfaz con los libros correspondientes.
 * @param {string} generoSeleccionado El género seleccionado para filtrar los libros.
 * @returns {void}
 */
function cambiarGenero(generoSeleccionado) {
    let genero = "";
    switch (generoSeleccionado) {
    case "romance":
        genero = "Romance";
        break;
    case "science:fiction":
        genero = "Ciencia ficción";
        break;
    case "fantasy":
        genero = "Fantasia";
        break;
    case "drama":
        genero = "Drama";
        break;
    case "young:fiction":
        genero = "Juveniles";
        break;
    case "poetry":
        genero = "Poesía";
        break;
    case "biography":
        genero = "Biografías";
        break;
    }

    document.getElementById("boton-genero").innerHTML = genero;

    obtenerLibrosPorGenero(generoSeleccionado)
    .then(libros => {
        document.getElementById("cont_carga").replaceChildren();
        crearCards(libros);
    });
}

/**
 * Realiza una solicitud a la API de Google Books para obtener libros basados en un género específico.
 * @param {string} generoSeleccionado El género por el cual se filtrarán los libros.
 * @returns {Promise<Object>} Una promesa que resuelve con los libros obtenidos del género seleccionado.
 */
async function obtenerLibrosPorGenero(generoSeleccionado) {
    try {
      const urlConNuevoGenero = `${api_url_info}?q=subject:${generoSeleccionado}${parametros}`;
      const respuesta = await fetch(urlConNuevoGenero);
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
                    <img src="${libroMappeado.urlImagen}" class="card-img-top mx-auto" alt="...">
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