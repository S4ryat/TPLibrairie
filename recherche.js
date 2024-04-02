// rechercheLivres.js

// Fonction pour rechercher les livres en fonction du terme de recherche
async function searchBooks(searchTerm) {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&langRestrict=fr`);
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la recherche des livres:', error);
        return [];
    }
}

// Fonction pour gérer la soumission du formulaire de recherche
async function handleSearchFormSubmit(event) {
    event.preventDefault(); // Empêcher le rechargement de la page
    const searchTerm = document.getElementById('search').value;
    const books = await searchBooks(searchTerm);
    const scrollableBooks = document.querySelector('.scrollable-books');
    // Supprimer le contenu actuel
    scrollableBooks.innerHTML = '';
    // Afficher les livres
    books.forEach(book => {
        const bookInfo = {
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Auteur inconnu',
            imageUrl: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150'
        };
        const bookElement = createBookElement(bookInfo);
        scrollableBooks.appendChild(bookElement);
    });
    hideNonSearchSections();
}

// Écouter l'événement de soumission du formulaire de recherche
const searchForm = document.querySelector('form');
searchForm.addEventListener('submit', handleSearchFormSubmit);

// Fonction pour cacher les sections autres que la section de recherche
function hideNonSearchSections() {
    const sectionsToHide = document.querySelectorAll('.accueil-section, .inscription-box, footer');
    sectionsToHide.forEach(section => {
        section.style.display = 'none';
    });
}
