import headerTemplate from "../partials/templates/header.hbs"

export class Header {
  constructor(targetSelector) {
    this.refs = this.getRefs(targetSelector);
    this.addHelperToHandlebar();
  }

  drawView(model) {
    this.refs.target.innerHTML = headerTemplate({
      authenticate: model.authenticate,
      context: model.context,
    })
  }

  getRefs(targetSelector) {
    return {
      target: document.querySelector(targetSelector),
    }
  }

  addHelperToHandlebar() {

  }
}

// Написати новий хелпер
// Написати нову умовну конструкцію для двох блоків
// Написати нову умовну конструкцію для класу .current для кнопки .nav-button
