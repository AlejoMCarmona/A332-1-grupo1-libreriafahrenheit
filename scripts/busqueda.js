
function buscar()
{
    valor = document.getElementById('buscador').value;
    if(valor.length > 0)
    {
        window.location.href=`prueba.html?q=${valor}`;
    }
}
                                    