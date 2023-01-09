link = document.getElementById('favicon');
link_ = document.getElementById('favicon_');

const a = link.getAttribute('href');
const b = link_.getAttribute('href');

function animateFavicon() {
   
  timerId = setTimeout(() => {
    
    if (a === link.getAttribute('href')) { 
      link.setAttribute('href', b);
      link_.setAttribute('href', a)
    } else {
      link.setAttribute('href', a);
      link_.setAttribute('href', b)
    };
    animateFavicon()
  }, 1000);
}

animateFavicon();
