import { refs } from '../js/refs-team';

const { backdrop, closeModalBtn } = refs

// const closeModalBtn = document.querySelector('[data-modal="close"]'),
//   backdrop = document.querySelector('[data-modal="backdrop"]');

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