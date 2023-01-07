import iconTmpl from '../partials/templates/icon.hbs';
import sprite from '../images/symbol-defs.svg';
import arrIcons from '../images/icons.json';
import headerTemp from '../partials/templates/header.hbs';


const logoLink = document.querySelector("header"); //тут має бути "а .logo"


const item = arrIcons.icons[0];

console.log(item);
console.log(logoLink);


logoLink.innerHTML = iconTmpl({ item, sprite });
