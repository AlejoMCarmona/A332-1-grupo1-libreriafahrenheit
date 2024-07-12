$(document).ready(function () {
  $("#loading-spinner").show();

  const url = `https://openlibrary.org/search.json?q=language%3Aspa&sort=rating`;

  $.getJSON(url, function (data) {
    const books = data.docs.slice(0, 4);
    $("#loading-spinner").hide();
    books.forEach((book, index) => {
      const title = book.title;
      const author = book.author_name
        ? book.author_name.join(", ")
        : "Autor Desconocido";
      const coverId = book.cover_i;
      const coverUrl = coverId
        ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
        : "https://via.placeholder.com/150";

      $("#book-cards").append(`
                <div class="col-md-3">
                  <div class="card mx-auto">
                    <div class="imageContainer mx-auto">
                      <img src="${coverUrl}" class="card-img-top" alt="${title}">
                    </div>
                    <div class="card-body">
                      <h5 class="card-title text-center text-truncate">${title}</h5>
                      <h6 class="card-subtitle autor text-center text-truncate">${author}</p>
                    </div>
                  </div>
                </div>
            `);
    });
  });
});
