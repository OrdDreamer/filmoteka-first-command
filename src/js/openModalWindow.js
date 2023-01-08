import { refs } from "./refs-team";

const { backdrop, closeModalBtn, modal } = refs;

let isOpen = false;

export function openModalWindow(content) {
  modal.innerHTML = content;
  backdrop.classList.remove('visually-hidden');
  addListeners();
  isOpen = true;
}

function closeModalWindow() {
  modal.innerHTML = "";
  backdrop.classList.add('visually-hidden');
  removeListeners();
  isOpen = false;
}

function onBackdropClick(event) {
  if (event.target.classList.contains('backdrop')) {
    closeModalWindow();
  }
}

function onEscKeyPress(e) {
  if (e.code === 'Escape') {
    closeModalWindow();
  }
}

function addListeners() {
  if (isOpen) {
    return;
  }
  closeModalBtn?.addEventListener('click', closeModalWindow);
  backdrop?.addEventListener('click', onBackdropClick);
  window.addEventListener('keydown', onEscKeyPress);
}

function removeListeners() {
  if (!isOpen) {
    return;
  }
  closeModalBtn?.removeEventListener('click', closeModalWindow);
  backdrop?.removeEventListener('click', onBackdropClick);
  window.removeEventListener('keydown', onEscKeyPress);
}
