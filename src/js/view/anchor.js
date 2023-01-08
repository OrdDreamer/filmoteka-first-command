export function initAnchors() {
  const anchors = document.querySelectorAll('a[href*="#anchor-"]');
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

  const anchorLinkEl = document.querySelector('.anchor-link');
  const scrollChange = 100;

  const addClassOnScroll = () => {
    anchorLinkEl.classList.add('hide');
  };
  const removeClassOnScroll = () => {
    anchorLinkEl.classList.remove('hide');
  };

  window.addEventListener('scroll', function () {
    if (window.scrollY > scrollChange) {
      removeClassOnScroll();
    } else {
      addClassOnScroll();
    }
  });
}

