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
        window.location.replace("libros.html");
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
                        <h5 class="card-title text-center">${libroMappeado.titulo}</h5>
                        <p class="card-text text-center">${libroMappeado.autores}</p>
                    </div>
                </div>
                <div class="mt-auto mb-3 text-center">
                    <a href="#" class="btn btn-warning fs-6 w-75" onclick="comprar('${libroMappeado.id}')">Comprar</a>
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
      autores: libroAPI.volumeInfo.authors != undefined ? libroAPI.volumeInfo.authors.join(', ') : "Anonimo",
      urlImagen: libroAPI.volumeInfo.imageLinks != null ? libroAPI.volumeInfo.imageLinks.thumbnail : "../images/no_image.jpg",
    };
}