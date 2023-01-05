import { refs } from '../js/refs-team';

const {backdrop, closeModalBtn } = refs

let flag = false;

export function openModalWindow(e) {
  switch (e) {
    case backdrop:
      openModal(backdrop, closeModalBtn);
      break;
  }
}

function openModal(backdrop, btnClose) {
  backdrop.classList.remove('visually-hidden');
  btnClose.addEventListener('click', closeModalWindow);
  backdrop.addEventListener('click', closeToBackdrop);
  document.querySelector('.modal__btns-list').classList.remove('visually-hidden') 
  scroll();
  if (flag === false) {
    window.addEventListener('keydown', onEscKeyPress);
    flag = true;
  }
}

function closeModalWindow() {
  if (!backdrop.classList.contains('visually-hidden')) {
    backdrop.classList.add('visually-hidden');
    closeModalBtn.removeEventListener('click', closeModalWindow);
    backdrop.removeEventListener('click', closeToBackdrop);
    keyListner();
    return;
  }
}

function keyListner() {
  if (backdrop.classList.contains('visually-hidden')) {
    window.removeEventListener('keydown', onEscKeyPress);
    flag = false;
  }
}

function closeToBackdrop(e) {
  const name = e.target.className;
  if (name === 'backdrop') {
    closeModalWindow();
  }
}

function onEscKeyPress(e) {
  if (e.code === 'Escape') {
    closeModalWindow();
  }
}