//URL DE LA API CON LA INFO
const api_url_info = "https://openlibrary.org/search.json";
//URL CON LA API DE LAS COVERS
const api_covers = "https://covers.openlibrary.org/b/olid/";


//PARSEAR STRING A HTML 
function fromHTML(html, trim = true) {
    // Procesa el string a HTML.
    html = trim ? html.trim() : html;
    if (!html) return null;
  
    // Crea un nuevo template.
    const template = document.createElement('template');
    template.innerHTML = html;
    const result = template.content.children;
  
    // Devuelve el HTML o un HTML Collection.
    if (result.length === 1) return result[0];
    return result;
}

//ESTRUCTURA DE LA CARD
function crear_card(libro)
{   

    let titulo_libro = libro.title;
    let nombre_autor = libro.author_name[0];
    let olid = libro.cover_edition_key;
    let imagen_libro;
    //ACA PODRÍA IR UNA IMAGEN DE NO DISPONIBLE
    imagen_libro = `https://covers.openlibrary.org/b/olid/${olid}-L.jpg?default=false`; 

    let card = fromHTML(
        ` <div class="card pt-3 mt-md-0 mt-4 animate__animated animate__headShake">
                            <img src="${imagen_libro}" class="card-img-top mx-auto" alt="...">
                            <div class="informacion-libro mx-auto d-flex flex-column">
                                <div class="card-body">
                                    <h5 class="card-title">${titulo_libro}</h5>
                                    <p class="card-text">${nombre_autor}</p>
                                </div>
                            </div>
                            <div class="mt-auto mb-3 text-center">
                                <a href="#" class="btn btn-warning fs-6 w-75">Comprar</a>
                            </div>
                        </div>`);

                    
    let parent = document.getElementById("cont_carga").appendChild(card);

}

//PEDIDO A LA API
function cargar(param)
{   
   fetch(param)
  .then(response => {
    if (!response.ok) {
      throw new Error('Algo no salió bien.');
    }
    return response.json();
  })
  .then(libros => {
    
    libros.docs.forEach(element => {
        crear_card(element);
        });
        
   })
  .catch(error => {
    console.error('Error:', error);
  });
}

function llamado(genero) 
{

    let q = `subject_key:${genero}`;
    let fields ="title+author_name+cover_edition_key"
    let sort ="new"
    let limit ="20"

    const queryParams = `q=${q}` + '&' + `fields=${fields}` 
                          + '&' + `sort=${sort}` + '&' + `limit=${limit}`;
      
    // Combinamos para tener la búsquedas
    let parent = document.getElementById("cont_carga").replaceChildren();


    const newURL = `${api_url_info}?${queryParams}`;

    cargar(newURL);

}


let fields ="title+author_name+cover_edition_key";
let sort ="new";
let lang ="spa";
let limit ="20";
let q;

const urlParams = new URLSearchParams(window.location.search);
const busqueda = urlParams.get('q');

if(typeof busqueda !== 'undefined' && busqueda !== null)
{
    q = busqueda;
    q = q.replace(/\s/g, "+");
    console.log(q);
}
else
{
    q = "publish_year:2010";
    //let q = params;
}

const queryParams = `q=${q}` + '&' + `fields=${fields}` 
                    + '&' + `sort=${sort}` + '&' + `language=${lang}` + '&' + `limit=${limit}`;
 
// Combinamos para tener la búsquedas
const fullUrl = `${api_url_info}?${queryParams}`;

cargar(fullUrl);






