function poblarNovedades() {
  const url = "https://www.googleapis.com/books/v1/volumes";
  const params = new URLSearchParams({
    langRestrict: "es",
    orderBy: "newest",
    printType: "books",
    maxResults: 4,
    q: "-intitle:'gay'", // No pregunte porque esta esto, si saco esto rompe
  });
  console.log(params.toString());
  $.getJSON(`${url}?${params.toString()}`, function (data) {
    console.log(data);
    for (let i = 0; i < 4; i++) {
      let title = data.items[i].volumeInfo.title;
      console.log(data.items[i].volumeInfo.authors);
      let author = data.items[i].volumeInfo.authors[0];
      let coverUrl = data.items[i].volumeInfo.imageLinks.thumbnail;

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
    }
    $("#loading-spinner").hide();
  });
}

$(document).ready(function () {
  poblarNovedades();
});
