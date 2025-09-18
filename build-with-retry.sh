#!/bin/bash

# Build script with retry logic for Google Fonts timeout
echo "Building with Google Fonts retry logic..."

# Try building up to 3 times
for i in {1..3}; do
    echo "Build attempt $i..."
    if npm run build; then
        echo "Build successful!"
        exit 0
    else
        echo "Build failed, retrying in 5 seconds..."
        sleep 5
    fi
done

echo "Build failed after 3 attempts"
exit 1