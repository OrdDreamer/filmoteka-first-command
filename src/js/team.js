import { refs } from '../js/refs-team';

import { openModalWindow } from './modal_team.js';
import contactsArr from '../data-team/team.json';
import contactsTmpl from '../partials/templates/team-list.hbs';

import sprite from '../data-team/sprite.svg';

const { contactsLink, modal, backdrop } = refs;

// const backdrop = document.querySelector('[data-modal="backdrop"]'),
//  modal = document.querySelector('.modal__content'),
//  contactsLink = document.querySelector('.js-students-contacts');


contactsLink.addEventListener('click', onContactsClick);

function onContactsClick() {
  openModalWindow(backdrop);
  const list = contactsArr.team;
  modal.innerHTML = contactsTmpl({ list, sprite });
}