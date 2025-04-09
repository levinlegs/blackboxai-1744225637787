class ClockWidget {
  constructor() {
    this.name = 'clock';
    this.element = document.createElement('div');
    this.element.className = 'widget clock';
    this.updateInterval = null;
  }

  init() {
    this.update();
    this.updateInterval = setInterval(() => this.update(), 1000);
    return this.element;
  }

  update() {
    const now = new Date();
    this.element.innerHTML = `
      <div class="time">${now.toLocaleTimeString()}</div>
      <div class="date">${now.toLocaleDateString()}</div>
    `;
  }

  destroy() {
    clearInterval(this.updateInterval);
  }
}

export default ClockWidget;
