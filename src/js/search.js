const callbacks = new Set();

const refs = {
    searchEl: document.querySelector('.header-search__input'),
};

export function addListenerOnInputSearch(callback) {
    callbacks.add(callback)
}

function onInput(e) {
    e.preventDefault();
    const query = refs.searchEl.value.trim();
    for (const callback of callbacks) {
        callback(query)
    }
}

refs.searchEl.addEventListener('input', onInput);