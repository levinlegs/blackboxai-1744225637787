class SystemStatsWidget {
  constructor() {
    this.name = 'system-stats';
    this.element = document.createElement('div');
    this.element.className = 'widget system-stats';
    this.updateInterval = null;
    this.stats = {
      cpu: 0,
      memory: 0,
      disk: 0
    };
  }

  async init() {
    await this.update();
    this.updateInterval = setInterval(() => this.update(), 2000);
    return this.element;
  }

  async update() {
    await this.getSystemStats();
    this.element.innerHTML = `
      <div class="stat">
        <span class="label">CPU:</span>
        <span class="value">${this.stats.cpu}%</span>
      </div>
      <div class="stat">
        <span class="label">Memory:</span>
        <span class="value">${this.stats.memory}%</span>
      </div>
      <div class="stat">
        <span class="label">Disk:</span>
        <span class="value">${this.stats.disk}%</span>
      </div>
    `;
  }

  async getSystemStats() {
    // Simulate getting system stats
    this.stats = {
      cpu: Math.floor(Math.random() * 100),
      memory: Math.floor(Math.random() * 100),
      disk: Math.floor(Math.random() * 100)
    };
  }

  destroy() {
    clearInterval(this.updateInterval);
  }
}

export default SystemStatsWidget;
