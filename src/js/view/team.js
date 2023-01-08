import { refs } from "./refs-team";
import { openModalWindow } from './openModalWindow.js';
import contactsArr from '../../data-team/team.json';
import contactsTmpl from '../../partials/templates/team-list.hbs';
import sprite from '../../data-team/sprite.svg';

const { contactsLink } = refs;

export function initAboutTeam() {
  contactsLink.addEventListener('click', onContactsClick);
}

function onContactsClick(event) {
  event.preventDefault();
  openModalWindow(contactsTmpl({
    list: contactsArr.team,
    sprite
  }));
}