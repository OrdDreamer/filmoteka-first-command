export let scrollpos = window.scrollY;

const anchorLinkEl = document.querySelector('.anchor-link');
const scrollChange = 250;

const addClassOnScroll = () => {
  anchorLinkEl.classList.add('hide');
};
const removeClassOnScroll = () => {
  anchorLinkEl.classList.remove('hide');
};

window.addEventListener('scroll', function () {
  scrollpos = window.scrollY;

  if (scrollpos > scrollChange) {
    removeClassOnScroll();
  } else {
    addClassOnScroll();
  }
});
