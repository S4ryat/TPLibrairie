// JavaScript pour le défilement des livres
const scrollableBooks = document.querySelector('.scrollable-books');
const scrollLeftButton = document.getElementById('scroll-left');
const scrollRightButton = document.getElementById('scroll-right');
let scrollPosition = 0;

scrollLeftButton.addEventListener('click', () => {
    if (scrollPosition > 0) {
        scrollPosition -= 200; // Ajustez la valeur de défilement selon votre design
        scrollableBooks.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }
});

scrollRightButton.addEventListener('click', () => {
    if (scrollPosition < scrollableBooks.scrollWidth - scrollableBooks.clientWidth) {
        scrollPosition += 200; // Ajustez la valeur de défilement selon votre design
        scrollableBooks.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }
});
