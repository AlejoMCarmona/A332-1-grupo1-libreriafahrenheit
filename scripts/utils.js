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
 * Redirige a una nueva página que simula una compra.
 * @returns {void} Un objeto Document que representa el HTML convertido.
 */
function comprar(id) {
    if(id.length > 0) {
        window.location.href = `comprar.html?q=${id}`;
    }
}

/**
 * Realiza una busqueda a partir del nombre de un libro, redirigiendo la ventana a la página con los resultados
 * @returns {void}
 */
function buscar() {
    valor = document.getElementById('buscador').value;
    if(valor.length > 0) {
        window.location.href = `resultados.html?q=${valor}`;
    }
}