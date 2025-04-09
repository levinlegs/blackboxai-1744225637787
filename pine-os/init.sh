#!/bin/bash
# Pine OS Initialization Script

# Load system configuration
source /etc/pine-os/config/base-config

# Initialize service manager
SERVICE_MANAGER="/usr/lib/pine-os/core/service-manager.js"

if [ -f "$SERVICE_MANAGER" ]; then
  echo "Starting Pine OS Service Manager..."
  node "$SERVICE_MANAGER" &
else
  echo "Error: Service manager not found at $SERVICE_MANAGER"
  exit 1
fi

echo "Pine OS initialized successfully"
