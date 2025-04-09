class ThemeManager {
  constructor() {
    this.availableThemes = {};
    this.currentTheme = null;
    this.loadThemes();
  }

  async loadThemes() {
    const response = await fetch('themes.json');
    const themeList = await response.json();
    
    for (const themeName of themeList) {
      const themeResponse = await fetch(`futuristic-dark/theme.json`);
      this.availableThemes[themeName] = await themeResponse.json();
    }
    
    // Set default theme
    this.setTheme('futuristic-dark');
  }

  setTheme(themeName) {
    if (!this.availableThemes[themeName]) {
      console.error(`Theme ${themeName} not found`);
      return false;
    }

    this.currentTheme = themeName;
    this.applyTheme();
    return true;
  }

  applyTheme() {
    const theme = this.availableThemes[this.currentTheme];
    
    // Update CSS variables
    const root = document.documentElement;
    for (const [key, value] of Object.entries(theme.colors)) {
      root.style.setProperty(`--${key}`, value);
    }
    
    // Update fonts
    document.body.style.fontFamily = theme.fonts.main;
    
    // Notify widgets of theme change
    if (window.widgetManager) {
      window.widgetManager.refreshAllWidgets();
    }
  }

  getCurrentTheme() {
    return this.currentTheme;
  }

  getAvailableThemes() {
    return Object.keys(this.availableThemes);
  }
}

// Initialize and expose globally
window.themeManager = new ThemeManager();
