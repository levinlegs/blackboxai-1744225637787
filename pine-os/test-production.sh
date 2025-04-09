#!/bin/bash
# Pine OS Production Test Script

test_system_services() {
  echo "Testing system services..."
  if ! systemctl is-active --quiet pine-os; then
    echo "Error: pine-os service not running"
    return 1
  fi

  # Verify core services are running
  services=("face-auth" "widget-manager" "theme-manager")
  for service in "${services[@]}"; do
    status=$(curl -s http://localhost:3000/api/services/$service | jq -r .status)
    if [ "$status" != "running" ]; then
      echo "Error: $service not running"
      return 1
    fi
  done
}

test_face_auth() {
  echo "Testing face authentication..."
  test_image="/usr/lib/pine-os/security/face-id/test_face.jpg"
  if [ ! -f "$test_image" ]; then
    echo "Warning: Face auth test image missing"
    return
  fi

  result=$(python3 /usr/lib/pine-os/security/face-id/pam_face_auth.py --test "$test_image")
  if [ "$result" != "Authentication successful" ]; then
    echo "Error: Face auth test failed"
    return 1
  fi
}

test_widget_system() {
  echo "Testing widget system..."
  if ! curl -s http://localhost:3000/api/widgets | jq -e '.widgets | length > 0' > /dev/null; then
    echo "Error: No widgets registered"
    return 1
  fi
}

test_theme_system() {
  echo "Testing theme system..."
  current_theme=$(curl -s http://localhost:3000/api/theme | jq -r .current)
  if [ -z "$current_theme" ]; then
    echo "Error: No active theme"
    return 1
  fi
}

main() {
  test_system_services || exit 1
  test_face_auth || exit 1
  test_widget_system || exit 1
  test_theme_system || exit 1

  echo "All production tests passed successfully"
  echo "Pine OS is running correctly"
}

main "$@"
