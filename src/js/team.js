import { refs } from '../js/refs-team';

import { openModalWindow } from './modal_team.js';
import contactsArr from '../data-team/team.json';
import contactsTmpl from '../partials/templates/team-list.hbs';

import sprite from '../data-team/sprite.svg';

const { contactsLink, modal, backdrop } = refs;

contactsLink.addEventListener('click', onContactsClick);

function onContactsClick() {
  openModalWindow(backdrop);
  document.querySelector('.modal__btns-list').classList.add('visually-hidden') 
  const list = contactsArr.team;
  modal.innerHTML = contactsTmpl({ list, sprite });
}