link = document.getElementById('favicon');
link_ = document.getElementById('favicon_');

const a = link.getAttribute('href');
const b = link_.getAttribute('href');
let index = 0

function animateFavicon() {
   
  timerId = setTimeout(() => {
    
    if (index === 0) { 
      link.setAttribute('href', b);
      link_.setAttribute('href', a)
      index = 1;
    } else {
      link.setAttribute('href', a);
      link_.setAttribute('href', b)
      index = 0;
    };
    animateFavicon()
  }, 1000);
}

animateFavicon();
