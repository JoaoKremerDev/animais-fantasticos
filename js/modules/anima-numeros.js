export default class AnimaNumeros {
  constructor(numeros, observerTarget, observerClass) {
    this.numeros = document.querySelectorAll(numeros);
    this.observerTarget = document.querySelector(observerTarget);
    this.observerClass = observerClass;

    // BIND DO OBJETO DA CLASSE PARA O CALLBACK DA MUTAÇÃO
    this.handleMutation = this.handleMutation.bind(this);
  }

  // RECEBE UM ELEMENTO DO DOM COM NÚMERO EM SEU TEXTO
  // INCREMENTA A PARTIR DE 0 ATÉ O NÚMERO FINAL (TOTAL)
  static incrementarNumero(numero) {
    const total = +numero.innerText;
    const incremento = Math.floor(total / 100);
    let start = 0;
    const timer = setInterval(() => {
      start += incremento;
      numero.innerText = start;
      if (start > total) {
        numero.innerText = total;
        clearInterval(timer);
      }
    }, 25 * Math.random());
  }

  // ATIVA INCREMENTAR ANIMAÇÃO DE NÚMEROS PARA CADA NÚMERO SELECIONADO DO DOM
  animaNumeros() {
    this.numeros.forEach((numero) => {
      this.constructor.incrementarNumero(numero);
    });
  }

  // FUNÇÃO QUE OCORRE QUANDO AS MUTAÇÕES OCORREREM
  handleMutation(mutation) {
    if (mutation[0].target.classList.contains(this.observerClass)) {
      this.observer.disconnect();
      this.animaNumeros();
    }
  }

  // ADICIONA O MUTATION PARA VERIFICAR QUANDO A CLASSE ATIVO É ADICIONADA AO ELEMENTO TARGET
  addMutationObserver() {
    this.observer = new MutationObserver(this.handleMutation);
    this.observer.observe(this.observerTarget, { attributes: true });
  }

  init() {
    if (this.numeros.length && this.observerTarget) {
      this.addMutationObserver();
    }
    return this;
  }
}
