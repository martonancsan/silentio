#!/bin/bash

echo "Sending ten data frames"
bash http.sh

echo "Setting targetFirmwareUrl"
bash setTargetFirmwareUrl.sh

echo "Setting targetFirmwareVersion"
bash setTargetFirmwareVersion.sh

echo "Startup script finished."

