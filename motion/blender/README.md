# Blender Assets

## Files

| File | Description |
|---|---|
| `starter.blend` | Base scene: camera rig, head-chest driver, apple proxy, Geometry Nodes burst morph, lighting setup |

## To Use

1. Open `starter.blend` in Blender 4.x
2. Navigate to the **Geometry Nodes** workspace
3. Select `Apple_Proxy` and inspect the `BurstMorph` modifier
4. Timeline: scrub to frame 312–357 to preview the burst morph
5. To render: File → Render → Render Animation (or use `scripts/render_blender.sh`)

## Blender Version

Requires **Blender 4.0+**. Geometry Nodes API changed significantly in 3.x vs 4.x — do not open in Blender 3.x.

## Scene Structure

```
Scene
├── CameraRig_Root (Empty)
│   └── CameraRig_Boom
│       └── CameraRig_Arm
│           └── Camera
├── FocusTarget (Empty)
├── Apple_Proxy (Mesh + GN modifier: BurstMorph)
├── HeadChest_Proxy (Mesh + shape key: Breathe)
├── Lighting
│   ├── Key (Area, 5000 lm)
│   ├── Fill (Area, 800 lm)
│   └── Rim (Spot, 2000 lm)
└── World (HDRI: studio_small_09_1k.hdr — add your own)
```
