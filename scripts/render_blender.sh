#!/usr/bin/env bash
# ============================================================
# render_blender.sh — headless Blender render automation
#
# Usage:
#   sh scripts/render_blender.sh <blend_file> [start_frame] [end_frame] [output_prefix]
#
# Examples:
#   sh scripts/render_blender.sh motion/blender/starter.blend 1 240 motion/renders/shot_
#   sh scripts/render_blender.sh motion/blender/scene_burst.blend 312 357 motion/renders/burst_
#
# Output: PNG sequence at <output_prefix>NNNN.png
# ============================================================
set -euo pipefail

BLEND_FILE="${1:-motion/blender/starter.blend}"
START_FRAME="${2:-1}"
END_FRAME="${3:-240}"
OUT_PREFIX="${4:-motion/renders/shot_}"

if [ ! -f "$BLEND_FILE" ]; then
  echo "ERROR: .blend file not found: $BLEND_FILE"
  exit 1
fi

# Ensure output directory exists
OUT_DIR=$(dirname "$OUT_PREFIX")
mkdir -p "$OUT_DIR"

echo "==> Rendering: $BLEND_FILE"
echo "    Frames:   $START_FRAME–$END_FRAME"
echo "    Output:   ${OUT_PREFIX}NNNN.png"
echo ""

blender \
  -b "$BLEND_FILE" \
  -o "${OUT_PREFIX}####" \
  -F PNG \
  -x 1 \
  -s "$START_FRAME" \
  -e "$END_FRAME" \
  -a

echo ""
echo "✅ Render complete → $OUT_DIR"
