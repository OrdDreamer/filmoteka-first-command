import VanillaTilt from "vanilla-tilt";



const refs = {
  navEl: document.querySelector('.header-navigation_list'),
};

export function showAuthBlock() {
    refs.navEl.innerHTML = '';
    const markup = `<li><button type="button" class="header-btn" data-login-open>LOGIN</button></li>
        <li><button type="button" class="header-btn" data-registration>REGISTRATION</button></li>`;
    refs.navEl.insertAdjacentHTML('beforeend', markup);
    VanillaTilt.init(document.querySelectorAll(".header-btn"));
};

export function showNavBlock() {
    refs.navEl.innerHTML = '';
    const markup = `<li><a href="/" class="link header__link active__link">HOME</a></li>
<li><a href="/li" class="link header__link">MY LIBRARY</a></li>
<li><button type="button" class="header-btn">LOG OUT</button></li>`;
    refs.navEl.insertAdjacentHTML('beforeend', markup);
    VanillaTilt.init(document.querySelectorAll(".header-btn"));
};

(() => {
  const refs = {
    openLoginBtn: document.querySelector("[data-login-open]"),
    closeLoginBtn: document.querySelector("[data-login-close]"),
    loginModal: document.querySelector("[data-login]"),
  };

    refs.openLoginBtn.addEventListener("click", toggleModal);   
    refs.closeLoginBtn.addEventListener("click", toggleModal);
    // refs.loginModal.addEventListener('click', toggleModal)

  function toggleModal() {
    refs.loginModal.classList.toggle("is-hidden");
  }
})();


(() => {
  const refs = {
    openRegistrationBtn: document.querySelector("[data-registration-open]"),
    closeRegistrationBtn: document.querySelector("[data-registration-close]"),
    registrationModal: document.querySelector("[data-registration]"),
  };

  refs.openRegistrationBtn.addEventListener("click", toggleModal);
  refs.closeRegistrationBtn.addEventListener("click", toggleModal);

  function toggleModal() {
    refs.registrationModal.classList.toggle("is-hidden");
  }
})();