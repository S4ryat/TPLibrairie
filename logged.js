function onLogin() {
    const navElement = document.querySelector('nav');
    navElement.dataset.isLoggedIn = 'true';
    updateNavigation(navElement);
}

function onLogout() {
    const navElement = document.querySelector('nav');
    navElement.dataset.isLoggedIn = 'false';
    updateNavigation(navElement);
}

function updateNavigation(navElement) {
    const isLoggedIn = navElement.dataset.isLoggedIn === 'true';

    // Cachez/Montrez les éléments appropriés en fonction de la valeur de isLoggedIn
    // Utilisez des classes CSS pour masquer ou afficher les éléments
}