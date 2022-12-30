import VanillaTilt from "vanilla-tilt";



const refs = {
  navEl: document.querySelector('.header-navigation_list'),
};

export function showAuthBlock() {
    refs.navEl.innerHTML = '';
    const markup = `<li><button type="button" class="header-btn">LOG IN</button></li>
        <li><button type="button" class="header-btn">REGISTRATION</button></li>`;
    refs.navEl.insertAdjacentHTML('beforeend', markup);
    VanillaTilt.init(document.querySelectorAll(".header-btn"));
};

export function showNavBlock() {
    refs.navEl.innerHTML = '';
    const markup = `<li><a href="/" class="link header__link active__link">HOME</a></li>
<li><a href="" class="link header__link">MY LIBRARY</a></li>
<li><button type="button" class="header-btn">LOG OUT</button></li>`;
    refs.navEl.insertAdjacentHTML('beforeend', markup);
    VanillaTilt.init(document.querySelectorAll(".header-btn"));
};

