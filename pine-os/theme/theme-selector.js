class ThemeSelector {
  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'theme-selector';
    this.render();
    document.body.appendChild(this.container);
  }

  async render() {
    if (!window.themeManager) return;
    
    const themes = themeManager.getAvailableThemes();
    const currentTheme = themeManager.getCurrentTheme();
    
    this.container.innerHTML = `
      <select class="theme-dropdown">
        ${themes.map(theme => 
          `<option value="${theme}" ${theme === currentTheme ? 'selected' : ''}>
            ${theme.replace(/-/g, ' ')}
          </option>`
        ).join('')}
      </select>
    `;
    
    this.container.querySelector('.theme-dropdown')
      .addEventListener('change', (e) => {
        themeManager.setTheme(e.target.value);
      });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ThemeSelector();
});
