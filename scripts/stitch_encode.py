#!/usr/bin/env python3
"""
stitch_encode.py — stitch PNG sequence → MP4 master

Usage:
    python3 scripts/stitch_encode.py --input-dir motion/renders --output motion/renders/master.mp4
    python3 scripts/stitch_encode.py --input-dir motion/renders --output motion/renders/master.mp4 --fps 24 --crf 18 --preset slow

Dependencies: ffmpeg must be on PATH
"""

import argparse
import os
import subprocess
import sys
from pathlib import Path


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Stitch PNG sequence to MP4 via FFmpeg")
    p.add_argument("--input-dir", required=True, help="Directory containing shot_NNNN.png files")
    p.add_argument("--output", default="motion/renders/master.mp4", help="Output MP4 path")
    p.add_argument("--fps", type=int, default=24, help="Frames per second (default: 24)")
    p.add_argument("--crf", type=int, default=18, help="CRF quality (0=lossless, 51=worst, default: 18)")
    p.add_argument("--preset", default="slow", choices=["ultrafast","fast","medium","slow","veryslow"],
                   help="x264 encode preset (default: slow)")
    p.add_argument("--pattern", default="shot_%04d.png", help="PNG filename pattern (default: shot_%%04d.png)")
    return p.parse_args()


def main() -> None:
    args = parse_args()

    input_dir = Path(args.input_dir)
    if not input_dir.exists():
        print(f"ERROR: input directory not found: {input_dir}", file=sys.stderr)
        sys.exit(1)

    # Check at least one matching frame exists
    frames = sorted(input_dir.glob("shot_*.png"))
    if not frames:
        print(f"ERROR: no PNG frames matching 'shot_*.png' found in {input_dir}", file=sys.stderr)
        sys.exit(1)
    print(f"==> Found {len(frames)} frames in {input_dir}")

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    seq = str(input_dir / args.pattern)

    cmd = [
        "ffmpeg", "-y",
        "-framerate", str(args.fps),
        "-i", seq,
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-crf", str(args.crf),
        "-preset", args.preset,
        "-movflags", "+faststart",
        str(output_path),
    ]

    print(f"==> Encoding → {output_path}")
    print(f"    FPS: {args.fps}  CRF: {args.crf}  Preset: {args.preset}")
    print(f"    Command: {' '.join(cmd)}\n")

    result = subprocess.run(cmd, check=False)
    if result.returncode != 0:
        print("ERROR: ffmpeg failed. Check output above.", file=sys.stderr)
        sys.exit(result.returncode)

    size_mb = output_path.stat().st_size / (1024 * 1024)
    print(f"\n✅ Written: {output_path}  ({size_mb:.1f} MB)")


if __name__ == "__main__":
    main()
