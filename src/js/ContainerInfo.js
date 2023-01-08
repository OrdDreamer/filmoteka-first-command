import containerInfoTemplate from "../partials/templates/container-info.hbs"

export default class ContainerInfo {
  constructor(targetSelector) {
    this.refs = this.getRefs(targetSelector);
  }

  getRefs(targetSelector) {
    return {
      target: document.querySelector(targetSelector),
    }
  }

  drawView(data) {
    this.refs.target.innerHTML = containerInfoTemplate(data);
  }

  clear() {
    this.refs.target.innerHTML = "";
  }
}