# Motion Pipeline Reference

> Production pipeline for all cinematic demos in this repo.  
> Tools: Blender 4.x → After Effects (optional) → DaVinci Resolve → FFmpeg

---

## Scene Map

| Scene ID | Name | Frames | Duration (24fps) | Notes |
|---|---|---|---|---|
| SC_01 | Wake / POV | 1–60 | ~2.5s | Micro-motion, blink, breath |
| SC_02 | Door Push | 61–145 | ~3.5s | Threshold transition |
| SC_03 | Wide Establishing | 146–217 | ~3s | Environment wide |
| SC_04 | Push In | 218–289 | ~3s | Slow dolly + dof |
| SC_05 | Shake | 290–311 | ~0.9s | Camera shake peak |
| SC_06 | Burst | 312–357 | ~1.9s | Geometry Nodes morph |
| SC_07 | Book | 358–407 | ~2s | Object reveal |
| SC_08 | UI Reveal | 408–480 | ~3s | Brand / product overlay |

**Total master: 480 frames @ 24fps = 20 seconds**

---

## Render Settings

### Blender (Cycles)

```
Resolution:    1920 × 1080 px
FPS:           24
Colour Space:  Filmic / AgX
Output:        EXR (32bpc) for grading pass, PNG (16bpc) for quick preview
Samples:       512 (production), 64 (preview)
Denoiser:      OpenImageDenoise (OIDN)
Motion Blur:   On (shutter 0.5)
Depth of Field: On per shot (see per-scene notes)
```

### After Effects Compositions

```
Comp size:     1920 × 1080
Frame rate:    24
Bit depth:     16bpc
Colour profile: sRGB for web delivery
```

### DaVinci Resolve (Grade Pass)

```
Timeline FPS:  24
Colour space:  DaVinci Wide Gamut (input) → Rec.709 (output)
Export codec:  ProRes 422 HQ (master), H.264 CRF 18 (web)
```

---

## FFmpeg Encode Commands

### Web master (H.264, high quality)

```bash
ffmpeg -y \
  -framerate 24 \
  -i motion/renders/shot_%04d.png \
  -c:v libx264 \
  -pix_fmt yuv420p \
  -crf 18 \
  -preset slow \
  -movflags +faststart \
  motion/renders/master.mp4
```

### Social square crop (1080×1080)

```bash
ffmpeg -y \
  -i motion/renders/master.mp4 \
  -vf "crop=1080:1080:420:0" \
  -c:v libx264 \
  -crf 18 \
  motion/renders/master_square.mp4
```

### GIF preview (for README)

```bash
ffmpeg -y \
  -i motion/renders/master.mp4 \
  -vf "fps=12,scale=640:-1:flags=lanczos,palettegen" \
  /tmp/palette.png

ffmpeg -y \
  -i motion/renders/master.mp4 \
  -i /tmp/palette.png \
  -filter_complex "fps=12,scale=640:-1:flags=lanczos[v];[v][1:v]paletteuse" \
  public/thumbnails/demo.gif
```

---

## Blender — Geometry Nodes (Burst Morph, SC_06)

Summary of the particle morph setup for the apple → data burst scene:

1. Add **Point Cloud** from apple mesh (`Mesh to Points` node)
2. Drive point **Position** with an animated `Mix` between apple surface positions and explode target positions
3. Animate the `Mix Factor` from 0 → 1 over frames 312–357 using a custom driver or keyframe
4. Add **Instance on Points** with a small icosphere to visualise each particle
5. Use **Random Value** node seeded by Point Index for scatter offset

See `motion/blender/starter.blend` for the ready-made node tree. Open the **Geometry Nodes** workspace and inspect the `BurstMorph` modifier on the `Apple_Proxy` object.

---

## After Effects — Key Expressions

### Camera Shake (SC_05, frames 290–311)

```javascript
// Apply to Position property of the camera null
freq = 18;
amp = effect("Shake Amp")("Slider");
wiggle(freq, amp)
```

Keyframe `Shake Amp` slider: 0 at frame 289, peak 40 at frame 300, back to 0 at 312.

### Blink (SC_01)

```javascript
// Apply to Opacity of the eyelid layer
blink_speed = 8;
v = Math.sin(time * blink_speed * Math.PI);
v < 0 ? 0 : v * 100
```

### Bounce Ease (UI Reveal, SC_08)

```javascript
// Apply to Scale
n = 0;
if (numKeys > 0){
  n = nearestKey(time).index;
  if (key(n).time > time) n--;
}
if (n == 0){ t = 0; v = value; }
else { t = time - key(n).time; v = velocityAtTime(key(n).time - thisComp.frameDuration/10); }
amp = 0.08; freq = 3.5; decay = 6;
v + amp * Math.sin(freq * 2 * Math.PI * t) * Math.exp(-decay * t)
```

---

## Sound Map

| SFX | Frame | Description |
|---|---|---|
| Sub bass hit | 330 | Burst impact |
| Sparkle rise | 312 | Particle spawn |
| Reverse reverb tail | 308–330 | Pre-hit build |
| UI chime | 415 | Product reveal |
| Ambient bed | 1–480 | Continuous low texture |

SFX stems in `motion/sounds/`. Mix in Resolve or a DAW before final encode.

---

## Thumbnail Spec

| File | Size | Notes |
|---|---|---|
| `thumb_master_1920x1080.jpg` | 1920×1080, < 500 KB | sRGB, sharp centre crop on key product |
| `thumb_scene_wake.jpg` | 1080×1080 | Social crop |
| `thumb_scene_burst.jpg` | 1080×1080 | Social crop |

Export from Resolve or Photoshop at quality 85–90 JPEG. See `public/thumbnails/README.md` for margin rules.

---

## Pipeline Checklist

- [ ] Render all scenes to EXR (Blender)
- [ ] Grade in DaVinci Resolve (Rec.709 output)
- [ ] Export ProRes 422 HQ master
- [ ] Re-encode to H.264 CRF 18 (web master)
- [ ] Generate GIF preview for README
- [ ] Export social square crop
- [ ] Generate thumbnails (3 sizes)
- [ ] Upload master to YouTube (unlisted → update `content/videos.yml`)
- [ ] Publish YouTube links and update README embeds
