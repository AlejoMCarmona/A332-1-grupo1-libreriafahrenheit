//URL DE LA API DE GOOGLE CON LA INFORMACIÓN DE LOS LIBROS
const api_url_info = "https://www.googleapis.com/books/v1/volumes";

// Parámetros iguales a todas las llamadas:
const orderBy = "relevance";
const lang = "en";
const limit = "12";
const parametros = `&orderBy=${orderBy}&langRestrict=${lang}&maxResults=${limit}`;

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
 * Realiza una solicitud a la API de Google Books para obtener libros basados en un título especificado.
 * @param {string} tituloBuscado El título por el cual se buscarán los libros.
 * @returns {Promise<Object>} Una promesa que resuelve con los libros obtenidos del título buscado.
 */
async function obtenerLibrosPorNombre(tituloBuscado) {
    try {
      const urlConTitulo = `${api_url_info}?q=intitle:${tituloBuscado}${parametros}`;
      console.log(urlConTitulo)
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
 * Función asincrónica para obtener libros considerados como "novedades".
 * @param {string} palabraClave - Palabra clave para la búsqueda de libros.
 * @param {number} cantidad - Cantidad máxima de resultados a obtener.
 * @returns {Promise<Object[]>} - Promesa que resuelve en un arreglo de objetos con información de libros.
 */
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