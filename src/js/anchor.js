export const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
  anchor.addEventListener('click', function (event) {
    event.preventDefault();
    const blockID = anchor.getAttribute('href');
    document.querySelector('' + blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
}

let scrollpos = window.scrollY;

const anchorLinkEl = document.querySelector('.anchor-link');
const scrollChange = 1;

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
