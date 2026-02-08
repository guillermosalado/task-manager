import { navbarTemplate } from '../templates/navbarTemplate.js';

document.addEventListener("DOMContentLoaded", async () => {
    const navbarNav = document.getElementById('navbarNav');
    
    const res = await fetch('/session');
    const user = await res.json();

    if (user.logged) {
        navbarNav.innerHTML = navbarTemplate.user;
        
        const logoutLink = document.getElementById("logout");
        logoutLink.addEventListener("click", (e) => {
            e.preventDefault();
            logout();
        });
    } else {
        navbarNav.innerHTML = navbarTemplate.guest;
    }
});

function logout() {
    window.location.href = '/logout';
}