#!/usr/bin/env bash
# ============================================================
# setup_ubuntu.sh — bootstrap motion + web dev on Ubuntu/Debian
# Usage: sh scripts/setup_ubuntu.sh
# ============================================================
set -euo pipefail

echo "==> Updating package index..."
sudo apt-get update -y

echo "==> Installing core system deps..."
sudo apt-get install -y \
  git \
  curl \
  ffmpeg \
  python3 \
  python3-pip \
  python3-venv \
  blender \
  imagemagick \
  build-essential

echo "==> Installing Node.js 18 via NodeSource..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

echo "==> Installing Python pipeline deps (user venv)..."
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install imageio opencv-python-headless numpy tqdm rich

echo ""
echo "==> DaVinci Resolve Note:"
echo "    Download from: https://www.blackmagicdesign.com/products/davinciresolve"
echo "    On Ubuntu, install the .deb manually after download."
echo ""
echo "✅ Setup complete. Activate venv with: source .venv/bin/activate"
