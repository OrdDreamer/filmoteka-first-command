import VanillaTilt from "vanilla-tilt";
import headerTemplate from "../partials/header.hbs"
import Handlebars from "handlebars";

VanillaTilt.init(document.querySelectorAll(".header-btn"));

const refs = {
  navEl: document.querySelector('.header-navigation_list'),
  headerTarget: document.querySelector('#header'),
};

refs.headerTarget.innerHTML = headerTemplate({ 
  isAuth: true,
  
})
  
  
// Handlebars.registerHelper("if", function(conditional, options) {
//   if (conditional) {
//     return options.fn(this);
//   } else {
//     return options.inverse(this);
//   }
// });




// export function showAuthBlock() {
//     refs.navEl.innerHTML = '';
//     const markup = `<li><button type="button" class="header-btn" data-login-open>LOGIN</button></li>
//         <li><button type="button" class="header-btn" data-registration>REGISTRATION</button></li>`;
//     refs.navEl.insertAdjacentHTML('beforeend', markup);
//     VanillaTilt.init(document.querySelectorAll(".header-btn"));
// };

// export function showNavBlock() {
//     refs.navEl.innerHTML = '';
//     const markup = `<li><a href="/" class="link header__link active__link">HOME</a></li>
// <li><a href="/li" class="link header__link">MY LIBRARY</a></li>
// <li><button type="button" class="header-btn">LOG OUT</button></li>`;
//     refs.navEl.insertAdjacentHTML('beforeend', markup);
//     VanillaTilt.init(document.querySelectorAll(".header-btn"));
// };

