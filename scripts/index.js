
//URL DE LA API DE GOOGLE CON LA INFORMACIÓN DE LOS LIBROS
const api_url_info = "https://www.googleapis.com/books/v1/volumes";

// Parámetros iguales a todas las llamadas:
const orderBy = "relevance";
const lang = "en";
const limit = "12";
const parametros = `&orderBy=${orderBy}&langRestrict=${lang}&maxResults=${limit}`;

// Para simular una compra, se captura el envío del formulario para mostrar un mensaje de éxito una vez que todos los campos se completaron correctamente.
window.addEventListener("DOMContentLoaded", function() {
  var a = document.getElementById('formulario-registro');
  console.log(a);
  a
  .addEventListener("submit", function(e) {
    console.log("HECHO");
    e.preventDefault();
    actualizarRegistro();
  })
});

$(document).ready(function () {
  cargarNovedades('subject:argentina', 4);
});

function cargarNovedades(palabraClave, cantidad = 5) {
  console.log("HOLA");
  obtenerNovedades(palabraClave, cantidad)
  .then(libros => {
      console.log(libros);
      crearCards(libros);
  });
}

async function obtenerNovedades(palabraClave, cantidad) {
  try {
    const parametros = `&orderBy=newest&printType=books&langRestrict=${lang}&maxResults=${cantidad}`;
    const urlNovedades = `${api_url_info}?q=${palabraClave}${parametros}`;
    console.log(urlNovedades);
    const respuesta = await fetch(urlNovedades);
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
 * Crea tarjetas visuales para mostrar los libros en la interfaz.
 * @param {Array} libros Array de objetos que representan los libros a mostrar.
 * @returns {void}
 */
function crearCards(libros) {
  libros.items.forEach((libro) => {
      let libroMappeado = mappearLibro(libro);
      let cardLibro = convertirStringACodigoHTML(
          `
          <div class="card pt-3 mt-md-0 mt-4 animate__animated animate__headShake">
              <img src="${libroMappeado.urlImagen}" class="card-img-top mx-auto" alt="...">
              <div class="informacion-libro mx-auto d-flex flex-column">
                  <div class="card-body">
                      <h5 class="card-title">${libroMappeado.titulo}</h5>
                      <p class="card-text">${libroMappeado.autores}</p>
                  </div>
              </div>
              <div class="mt-auto mb-3 text-center">
                  <a href="#" class="btn btn-warning fs-6 w-75" onclick="comprar('${libroMappeado.id}')">Comprar</a>
              </div>
          </div>
          `
      );
  
      console.log(cardLibro);
      document.getElementById("book-cards").append(cardLibro);
  });
  $("#loading-spinner").hide();
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

function actualizarRegistro() {
  const mensajeExito = convertirStringACodigoHTML(
    `
    <h3 class="text-center titulo-principal">¡Registro realizado con éxito!</h3>
    `
  )
  document.getElementById("formulario-registro").replaceWith(mensajeExito);
}

/**
 * Simula la compra de un libro y muestra un mensaje de éxito.
 * @returns {void}.
 */
function comprar() {
  mostrarMensaje("¡Compra realizada con éxito!");
}