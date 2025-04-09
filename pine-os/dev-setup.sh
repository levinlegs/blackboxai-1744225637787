#!/bin/bash
# Pine OS Development Setup

# Install dev dependencies
install_dependencies() {
  apt-get update
  apt-get install -y \
    nodejs \
    npm \
    python3 \
    python3-pip \
    build-essential
  
  pip3 install face-recognition
  npm install -g nodemon
}

# Setup dev environment
setup_environment() {
  mkdir -p /var/log/pine-os
  chmod 777 /var/log/pine-os
  
  # Install dev tools
  npm install
  
  echo "export PINE_DEV_MODE=1" >> /etc/profile.d/pine-os.sh
  echo "export NODE_PATH=/usr/lib/pine-os" >> /etc/profile.d/pine-os.sh
}

# Configure hot-reload for development
configure_hot_reload() {
  cat > /etc/systemd/system/pine-os-dev.service <<EOF
[Unit]
Description=Pine OS Development Service
After=network.target

[Service]
ExecStart=nodemon --watch /usr/lib/pine-os -x "node /usr/lib/pine-os/core/service-manager.js"
Restart=always
User=root
Group=root
Environment=PATH=/usr/bin:/usr/local/bin
Environment=NODE_ENV=development
WorkingDirectory=/usr/lib/pine-os

[Install]
WantedBy=multi-user.target
EOF

  systemctl daemon-reload
}

main() {
  install_dependencies
  setup_environment
  configure_hot_reload
  
  echo "Development environment ready"
  echo "Start development service with: systemctl start pine-os-dev"
}

main "$@"
