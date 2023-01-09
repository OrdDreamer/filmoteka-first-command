const link = document.getElementById('favicon');
const link_ = document.getElementById('favicon_');

const a = link.getAttribute('href');
const b = link_.getAttribute('href');

export function initFavicon() {
  setInterval(() => {
    if (a === link.getAttribute('href')) {
      link.setAttribute('href', b);
      link_.setAttribute('href', a)
    } else {
      link.setAttribute('href', a);
      link_.setAttribute('href', b)
    }
  }, 750);
}

