export default class Tooltip {
  constructor(tooltips) {
    this.tooltips = document.querySelectorAll(tooltips);

    // BIND DO OBJETO DA CLASSE AOS CALLBACKS
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
  }

  // MOVE A TOOLTIP COM BASE NOS ESTILOS DE ACORDO COM A POSIÇÃO DO MOUSE
  onMouseMove(event) {
    this.tooltipBox.style.top = `${event.pageY + 20}px`;
    if (event.pageX + 240 > window.innerWidth) {
      this.tooltipBox.style.left = `${event.pageX - 190}px`;
    } else {
      this.tooltipBox.style.left = `${event.pagex + 20}px`;
    }
  }

  // REMOVE OS EVENTOS DE MOUSEMOVE E MOUSELEAVE
  onMouseLeave({ currentTarget }) {
    this.tooltipBox.remove();
    currentTarget.removeEventListener('mouseleave', this.onMouseLeave);
    currentTarget.removeEventListener('mousemove', this.onMouseMove);
  }

  // CRIA A TOOLTIP BOX E COLOCA NO BODY
  criarTooltipBox(element) {
    const tooltipBox = document.createElement('div');
    const text = element.getAttribute('aria-label');
    tooltipBox.classList.add('tooltip');
    tooltipBox.innerText = text;
    document.body.appendChild(tooltipBox);
    this.tooltipBox = tooltipBox;
  }

  // CRIA A TOOLTIP E ADICIONAR OS EVENTOS AO TARGET
  onMouseOver({ currentTarget }) {
    this.criarTooltipBox(currentTarget);
    currentTarget.addEventListener('mousemove', this.onMouseMove);
    currentTarget.addEventListener('mouseleave', this.onMouseLeave);
  }

  // ADICIONA OS EVENTOS DE MOUSEOVER A CADA TOOLTIP
  addTooltipsEvent() {
    this.tooltips.forEach((item) => {
      item.addEventListener('mouseover', this.onMouseOver);
    });
  }

  // INICIA A FUNÇÃO
  init() {
    if (this.tooltips.length) {
      this.addTooltipsEvent();
    }
  }
}
