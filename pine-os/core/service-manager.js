class ServiceManager {
  constructor() {
    this.services = new Map();
    this.loadCoreServices();
  }

  loadCoreServices() {
    // Security services
    this.registerService('face-auth', {
      path: '/usr/lib/pine-os/security/face-id/pam_face_auth.py',
      autoStart: true
    });

    // Widget services
    this.registerService('widget-manager', {
      path: '/usr/lib/pine-os/widgets/widget-manager.js',
      autoStart: true  
    });

    // Theme services
    this.registerService('theme-manager', {
      path: '/usr/lib/pine-os/theme/theme-manager.js',
      autoStart: true
    });
  }

  registerService(name, config) {
    this.services.set(name, {
      ...config,
      status: 'stopped',
      pid: null
    });
    
    if (config.autoStart) {
      this.startService(name);
    }
  }

  startService(name) {
    const service = this.services.get(name);
    if (!service) return false;

    // In a real system, this would fork the process
    console.log(`Starting service: ${name}`);
    service.status = 'running';
    service.pid = Math.floor(Math.random() * 10000); // Mock PID
    
    return true;
  }

  stopService(name) {
    const service = this.services.get(name);
    if (!service || service.status !== 'running') return false;

    console.log(`Stopping service: ${name}`);
    service.status = 'stopped';
    service.pid = null;
    
    return true;
  }

  getServiceStatus(name) {
    const service = this.services.get(name);
    return service ? service.status : 'not_found';
  }
}

module.exports = ServiceManager;
