#!/bin/bash
# Pine OS Deployment Script

# Verify dependencies
check_dependencies() {
  if ! command -v node &> /dev/null; then
    echo "Error: Node.js is required but not installed"
    exit 1
  fi
  if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is required but not installed"
    exit 1
  fi
}

# Build the system
build_system() {
  echo "Building Pine OS..."
  if ! bash pine-os/build.sh; then
    echo "Build failed"
    exit 1
  fi
}

# Configure system services
configure_services() {
  echo "Configuring services..."
  
  # Create systemd service
  cat > /etc/systemd/system/pine-os.service <<EOF
[Unit]
Description=Pine OS Service
After=network.target

[Service]
ExecStart=/usr/bin/pine-init
Restart=always
User=root
Group=root
Environment=PATH=/usr/bin:/usr/local/bin
Environment=NODE_ENV=production
WorkingDirectory=/usr/lib/pine-os

[Install]
WantedBy=multi-user.target
EOF

  systemctl daemon-reload
  systemctl enable pine-os.service
}

# Main deployment
main() {
  check_dependencies
  build_system
  configure_services
  
  echo "Pine OS deployed successfully"
  echo "Start with: systemctl start pine-os"
}

main "$@"
