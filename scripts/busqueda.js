/**
 * Realiza una busqueda a partir del nombre de un libro, redirigiendo la ventana a la página con los resultados
 * @returns {void}
 */
function buscar() {
    valor = document.getElementById('buscador').value;
    console.log(valor);
    if(valor.length > 0) {
        window.location.href = `resultados.html?q=${valor}`;
    }
}