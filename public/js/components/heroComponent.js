import { heroTemplate } from "../templates/heroTemplate.js";

document.addEventListener("DOMContentLoaded", async () => {
    const hero = document.getElementById('hero');
    
    const res = await fetch('/session');
    const user = await res.json();

    if (user.logged) 
        hero.innerHTML = heroTemplate.user;
    else 
        hero.innerHTML = heroTemplate.guest;
});