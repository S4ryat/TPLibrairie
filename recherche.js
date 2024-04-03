document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearchFormSubmit);
    } else {
        console.error('Formulaire de recherche non trouvé.');
    }
});

async function handleSearchFormSubmit(event) {
    event.preventDefault(); // Empêcher le rechargement de la page
    const searchTerm = document.getElementById('search').value.trim();
    if (searchTerm !== '') {
        try {
            const books = await searchBooks(searchTerm);
            displayBooks(books);
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la recherche des livres:', error);
        }
    } else {
        console.log('Veuillez entrer un terme de recherche valide.');
    }
}

async function searchBooks(searchTerm) {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&langRestrict=fr`);
    const data = await response.json();
    return data.items;
}

function displayBooks(books) {
    const livresListe = document.getElementById('livresListe');
    livresListe.innerHTML = ''; // Effacer le contenu précédent
    books.forEach(book => {
        const bookInfo = {
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Auteur inconnu',
            imageUrl: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150'
        };
        const bookElement = createBookElement(bookInfo);
        livresListe.appendChild(bookElement);
    });
}

function createBookElement(bookInfo) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    const img = document.createElement('img');
    img.src = bookInfo.imageUrl;
    img.alt = bookInfo.title;
    bookCard.appendChild(img);

    const bookDetails = document.createElement('div');
    bookDetails.classList.add('book-details');

    const title = document.createElement('h3');
    title.textContent = bookInfo.title;
    bookDetails.appendChild(title);

    const author = document.createElement('p');
    author.textContent = `Auteur(s): ${bookInfo.author}`;
    bookDetails.appendChild(author);

    bookCard.appendChild(bookDetails);

    return bookCard;
}
