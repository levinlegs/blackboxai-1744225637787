const os = require('os');
const ServiceManager = require('./service-manager');

class SystemMonitor {
  constructor() {
    this.serviceManager = new ServiceManager();
    this.monitorInterval = setInterval(() => this.monitor(), 5000);
  }

  monitor() {
    const stats = {
      timestamp: new Date().toISOString(),
      load: os.loadavg(),
      memory: {
        total: os.totalmem(),
        free: os.freemem()
      },
      services: this.getServiceStatuses()
    };
    
    console.log('System Status:', stats);
  }

  getServiceStatuses() {
    const statuses = {};
    for (const [name, service] of this.serviceManager.services) {
      statuses[name] = {
        status: service.status,
        pid: service.pid,
        uptime: service.status === 'running' 
          ? Date.now() - service.startTime 
          : 0
      };
    }
    return statuses;
  }

  shutdown() {
    clearInterval(this.monitorInterval);
    console.log('System monitor stopped');
  }
}

// Start monitoring if run directly
if (require.main === module) {
  const monitor = new SystemMonitor();
  process.on('SIGINT', () => {
    monitor.shutdown();
    process.exit(0);
  });
}

module.exports = SystemMonitor;
