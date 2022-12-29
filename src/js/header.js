const refs = {
  navEl: document.querySelector('.header-navigation_list'),
};

export function showAuthBlock() {
    refs.navEl.innerHTML = '';
    const markup = `<li><button type="button" class="header-btn">Log In</button></li>
        <li><button type="button" class="header-btn">Registration</button></li>`;
    refs.navEl.insertAdjacentHTML('beforeend', markup);
};

export function showNavBlock() {
    refs.navEl.innerHTML = '';
    const markup = `<li><a href="" class="link">HOME</a></li>
        <li><a href="" class="link">MY LIBRARY</a></li>
        <li><button type="button" class="header-btn">Log Out</button></li>`;
    refs.navEl.insertAdjacentHTML('beforeend', markup);
};

