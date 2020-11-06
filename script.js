const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');
const apiURL = 'https://api.lyrics.ovh';

// Buscar por cancion o artista
async function searchSongs(term) {
    const res = await fetch(`${apiURL}/suggest/${term}`);
    const data = await res.json();
    showData(data);
}

// Mostrar canciones y artista en el DOM
function showData(data) {
    result.innerHTML = `
    <ul class="songs">
     ${data.data.map(song => (
        `
        <li>
        <span><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Obtener letra</button>
        </li>
        `
    )).join('')}
    </ul>
    `;

    if (data.prev || data.next) {
        more.innerHTML = `
         ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Anterior</button>` : ''}
         ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Siguiente</button>` : ''}
        `;
    } else {
        more.innerHTML = '';
    }
}

// Obtener prev y sig canciones
async function getMoreSongs(url) {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();
    showData(data);
}

// Event listeners
form.addEventListener('submit', e => {
    e.preventDefault();
    const searchTerm = search.value.trim();
    if (!searchTerm) {
        alert('Por favor, ingrese un término de búsqueda')
    } else {
        searchSongs(searchTerm);
    }
});