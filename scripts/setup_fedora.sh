#!/usr/bin/env bash
# ============================================================
# setup_fedora.sh — bootstrap motion + web dev on Fedora
# Usage: sh scripts/setup_fedora.sh
# ============================================================
set -euo pipefail

echo "==> Updating system..."
sudo dnf update -y

echo "==> Enabling RPM Fusion (free + nonfree) for ffmpeg and codec support..."
sudo dnf install -y \
  "https://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm" \
  "https://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm"
sudo dnf update -y

echo "==> Installing core tools..."
sudo dnf install -y \
  git \
  curl \
  ffmpeg \
  ffmpeg-devel \
  python3 \
  python3-pip \
  python3-virtualenv \
  blender \
  ImageMagick \
  gcc \
  make

echo "==> Installing Node.js 18..."
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo dnf install -y nodejs

echo "==> Installing Python pipeline deps (user venv)..."
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install imageio opencv-python-headless numpy tqdm rich

echo ""
echo "==> DaVinci Resolve Note:"
echo "    Resolve requires additional libs on Fedora."
echo "    See: https://forum.blackmagicdesign.com (Linux install thread)"
echo "    Download .run installer from Blackmagic website."
echo ""
echo "✅ Setup complete. Activate venv with: source .venv/bin/activate"
