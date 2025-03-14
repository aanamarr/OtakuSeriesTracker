console.log("Script cargado correctamente");

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM completamente cargado y parseado");

    // 🔹 Definir todas las variables ANTES de usarlas
    const input = document.querySelector('.js-search');
    const btnSearch = document.querySelector('.js-btn-search');
    const btnReset = document.querySelector('.js-btn-reset');
    const btnEliminateFav = document.querySelector('.js-eliminar-fav');
    const listResult = document.querySelector('.js-container-result');
    const listFav = document.querySelector('.js-container-selected-fav');

    // 🔹 Imprimir las variables después de inicializarlas
    console.log("Elementos en el DOM:");
    console.log("Input:", input);
    console.log("Botón de búsqueda:", btnSearch);
    console.log("Botón de reset:", btnReset);
    console.log("Botón eliminar favoritos:", btnEliminateFav);
    console.log("Contenedor de resultados:", listResult);
    console.log("Contenedor de favoritos:", listFav);

    console.log(document.querySelector('.js-search'));
    console.log(document.querySelector('.js-btn-search'));
    console.log(document.querySelector('.js-btn-reset'));
    console.log(document.querySelector('.js-eliminar-fav'));
    console.log(document.querySelector('.js-container-result'));
    console.log(document.querySelector('.js-container-selected-fav'));


    // 🔹 Verificar si algún elemento no se encontró
    if (!input || !btnSearch || !btnReset || !btnEliminateFav || !listResult || !listFav) {
        console.error("Uno o más elementos del DOM no se encontraron. Verifica los nombres de clase en index.html.");
        return; // 🔹 DETENER el código si hay error
    }

    

    let url = 'https://api.jikan.moe/v4/anime?q=';
    let search = url;
    let animeList = [];
    let favAnime = [];

    btnEliminateFav.addEventListener('click', () => {
        favAnime = [];
        listFav.innerHTML = '';
        localStorage.setItem('favAnimeServer', JSON.stringify(favAnime));
    });

    btnReset.addEventListener('click', () => {
        input.value = '';
        listFav.innerHTML = '';
        listResult.innerHTML = '';
    });
    
    console.log("Todos los elementos fueron encontrados correctamente.");

    btnSearch.addEventListener('click', (ev) => {
        ev.preventDefault();
        const searchInput = input.value.toLowerCase();
        fetch(url + searchInput)
            .then(resp => resp.json())
            .then((info) => {
                animeList = info.data;
                listResult.innerHTML = animeList.map(anime => 
                    `<div>
                        <img class="js-anime" src="${anime.images.jpg.image_url}" alt="${anime.title}" id="${anime.mal_id}" />
                        <p>${anime.title}</p>
                    </div>`
                ).join('');
                addFavListeners();
            });
    });

    function addFavListeners() {
        document.querySelectorAll('.js-anime').forEach(img => {
            img.addEventListener('click', (ev) => {
                const id = parseInt(ev.target.id);
                const anime = animeList.find(anime => anime.mal_id === id);
                if (!favAnime.some(f => f.mal_id === id)) {
                    favAnime.push(anime);
                    renderFavList();
                }
            });
        });
    }

    function renderFavList() {
        listFav.innerHTML = favAnime.map(fav => 
            `<div>
                <img src="${fav.images.jpg.image_url}" alt="${fav.title}" />
                <p>${fav.title}</p>
                <button class="remove-fav" data-id="${fav.mal_id}">X</button>
            </div>`
        ).join('');

        document.querySelectorAll('.remove-fav').forEach(btn => {
            btn.addEventListener('click', (ev) => {
                const id = parseInt(ev.target.dataset.id);
                favAnime = favAnime.filter(anime => anime.mal_id !== id);
                renderFavList();
            });
        });

        localStorage.setItem('favAnimeServer', JSON.stringify(favAnime));
    }

    const savedFavs = localStorage.getItem('favAnimeServer');
    if (savedFavs) {
        favAnime = JSON.parse(savedFavs);
        renderFavList();
    }
});
