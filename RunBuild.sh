#!/bin/bash

# Check if the script is run with root privileges
if [[ $EUID -ne 0 ]]; then
    echo "This script requires root privileges."
    echo "Re-running the script with sudo..."
    exec sudo bash "$0" "$@"
    exit 1
fi

# Commands to run sequentially
echo "Running commands with root privileges..."
set -e  # Exit immediately if a command fails

# Run each command
echo "Installing npm packages..."
sudo npm i --force

echo "Building the project..."
sudo npm run build

echo "Restarting services..."
sudo systemctl restart run_eatofy.service
sudo systemctl restart run_new_eatofy.service
sudo systemctl restart apache2.service

echo "All commands executed successfully!"

