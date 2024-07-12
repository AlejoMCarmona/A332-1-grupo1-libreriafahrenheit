cargarNovedades('subject:argentina', 4);

function cargarNovedades(palabraClave, cantidad = 5) {
  obtenerNovedades(palabraClave, cantidad)
  .then(libros => {
      crearCards(libros);
  });
}
  /**
 * Crea tarjetas visuales para mostrar los libros en la sección de novedades.
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

/**
 * Actualiza la sección de registro si este fue exitoso.
 * @returns {void}
 */
function actualizarRegistro() {
  const mensajeExito = convertirStringACodigoHTML(
    `
    <h3 class="text-center titulo-principal mb-5">¡Registro realizado con éxito!</h3>
    `
  )
  document.getElementById("formulario-registro").replaceWith(mensajeExito);
}

/**
 * Simula un registro éxitoso.
 * @returns {void}
 */
window.addEventListener("DOMContentLoaded", function() {
  document.getElementById('formulario-registro').addEventListener("submit", function(e) {
    e.preventDefault();
    actualizarRegistro();
  })
});