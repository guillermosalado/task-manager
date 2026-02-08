import { mainContentTemplate } from "../templates/mainContentTemplate.js";

document.addEventListener("DOMContentLoaded", async() => {
    const mainContent = document.getElementById('mainContent');
    
    const res = await fetch('/session');
    const user = await res.json();

    if (user.logged) {
        mainContent.innerHTML = mainContentTemplate.user;
    }
    else {
        mainContent.innerHTML = mainContentTemplate.guest;
    }
});