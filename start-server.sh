#!/bin/bash
# Start local server to test the site (e.g. http://localhost:8765)
cd "$(dirname "$0")"
echo "Starting server at http://localhost:8765"
echo "Press Ctrl+C to stop"
python3 -m http.server 8765
