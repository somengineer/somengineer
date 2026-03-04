# Blender Geometry Nodes Reference

Node tree recipes for the somengineer motion pipeline. Open `motion/blender/starter.blend` and navigate to the **Geometry Nodes** workspace.

---

## Burst Morph (SC_06 — Apple → Particles)

### Overview

Morphs an apple mesh into a dispersing particle cloud over ~45 frames.

### Node Tree

```
[Object Info: Apple_Proxy]
    └── Geometry
         └── [Mesh to Points]
              ├── Selection: [Compare: Index < point_count_driver]
              └── [Instance on Points]
                   ├── Instance: [Ico Sphere, radius 0.005]
                   └── [Set Position]
                        ├── Offset: [Vector Math: Multiply]
                        │    ├── [Random Value (Vector)]
                        │    └── [Float: morph_factor]  ← animate 0→1 over SC_06
                        └── [Realize Instances]
                             └── [Group Output]
```

### Driver Setup

1. Create a custom property `morph_factor` (0.0 → 1.0) on the `Apple_Proxy` object.
2. Keyframe: frame 312 → 0.0, frame 357 → 1.0.
3. Drive the **Offset Multiply Factor** node input with this property.

---

## Camera Rig (All Scenes)

### Recommended Setup

```
Empty (CameraRig_Root) — world position driver
  └── Empty (CameraRig_Boom) — vertical offset
       └── Empty (CameraRig_Arm) — horizontal dolly
            └── Camera
```

- Animate `CameraRig_Root` for global tracking moves.
- Add **Follow Path** constraint on `CameraRig_Root` for rail moves.
- Add **Damped Track** on Camera pointing at `FocusTarget` empty.

---

## Head-Chest Driver (SC_01)

Micro-motion breathing via shape key driver.

1. Add shape key `Breathe` on the head/chest mesh (subtle chest expansion).
2. Driver type: **Scripted Expression**
3. Expression: `sin(frame / 24.0 * 2 * 3.14159 * 0.28) * 0.015`  
   (0.28 Hz ≈ normal breathing rate)

---

## Environment Scatter (SC_03 Wide)

```
[Mesh: GroundPlane]
    └── [Distribute Points on Faces]
         ├── Density: 0.8
         └── [Instance on Points]
              ├── [Object Info: Prop_A], [Object Info: Prop_B] (Collection random)
              └── [Rotate Instances] — Random Euler Z
                   └── [Scale Instances] — Random 0.8–1.2
                        └── [Realize Instances]
                             └── [Group Output]
```

---

## Render Tips

- Use **Persistent Data** in render properties to cache geometry node evaluations between frames — speeds up sequential renders significantly.
- For EXR output, enable **Multi-Layer EXR** to capture diffuse, specular, and shadow passes separately for Resolve grading.
- Set **Noise Threshold** to 0.001 for clean particle renders (higher sample cost but no fireflies).
