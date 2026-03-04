# Thumbnail Spec

All thumbnails live in `public/thumbnails/`. They are referenced by `content/videos.yml` and rendered by the Next.js site.

## Required Files

| Filename | Size | Format | Max Size |
|---|---|---|---|
| `thumb_master_1920x1080.jpg` | 1920 × 1080 | JPEG | 500 KB |
| `thumb_scene_wake.jpg` | 1080 × 1080 | JPEG | 250 KB |
| `thumb_scene_burst.jpg` | 1080 × 1080 | JPEG | 250 KB |

## Export Settings

- Colour space: **sRGB**
- JPEG quality: **85–90**
- Export from DaVinci Resolve (grab frame) or Photoshop
- Sharpen: light output sharpening only

## Safe Area / Margin Rules

- Keep key subject within a **central 80%** safe zone
- Bottom 15% is reserved for title overlay text if the site templates add it
- No logos or text embedded in the thumbnail image itself (the site adds them)

## Generation Command (FFmpeg from video)

```bash
# Grab frame 360 from master render for book/burst thumb
ffmpeg -i motion/renders/master.mp4 \
  -vf "select=eq(n\,360)" \
  -vframes 1 \
  public/thumbnails/thumb_scene_burst.jpg

# Square crop for social
ffmpeg -i motion/renders/master.mp4 \
  -vf "select=eq(n\,30),crop=1080:1080:420:0" \
  -vframes 1 \
  public/thumbnails/thumb_scene_wake.jpg
```
