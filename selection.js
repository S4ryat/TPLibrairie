// selectionLivres.js

// Fonction pour récupérer une sélection de livres à partir de l'API Google Books
async function fetchBooksByGenre(genre) {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&langRestrict=fr`);
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des livres:', error);
        return [];
    }
}

// Fonction pour créer un élément de livre HTML
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

// Fonction pour afficher les livres dans la section "Notre Sélection"
async function displayBooksByGenre(genre) {
    const books = await fetchBooksByGenre(genre);
    const scrollableBooks = document.querySelector('.scrollable-books');
    // Supprimer le contenu actuel
    scrollableBooks.innerHTML = '';
    // Créer et ajouter les éléments de livre
    books.forEach(book => {
        const bookInfo = {
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Auteur inconnu',
            imageUrl: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150'
        };
        const bookElement = createBookElement(bookInfo);
        scrollableBooks.appendChild(bookElement);
    });
}

// Appeler la fonction pour afficher les livres au chargement de la page (vous pouvez changer le genre selon votre besoin)
displayBooksByGenre('geography');
