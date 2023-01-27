export default class Modal {
  constructor(abrir, fechar, container) {
    this.botaoAbrir = document.querySelector(abrir);
    this.botaoFechar = document.querySelector(fechar);
    this.containerModal = document.querySelector(container);

    // bind this ao callback para referência ao objeto da classe
    this.eventToggleModal = this.eventToggleModal.bind(this);
    this.cliqueForaModal = this.cliqueForaModal.bind(this);
  }

  // ABRE OU FECHA O MODAL
  toggleModal() {
    this.containerModal.classList.toggle('ativo');
  }

  // ADICIONA O EVENTO DE TOGGLE AO MODAL

  eventToggleModal(event) {
    event.preventDefault();
    this.toggleModal();
  }

  // FECHA O MODAL AO CLICAR FORA
  cliqueForaModal(event) {
    if (event.target === this.containerModal) {
      this.toggleModal(event);
    }
  }

  // ADICIONA OS EVENTOS AO MODAL
  addModalEvents() {
    this.botaoAbrir.addEventListener('click', this.eventToggleModal);
    this.botaoFechar.addEventListener('click', this.eventToggleModal);
    this.containerModal.addEventListener('click', this.cliqueForaModal);
  }

  init() {
    if (this.botaoAbrir && this.botaoFechar && this.containerModal) {
      this.addModalEvents();
    }
    return this;
  }
}
