# After Effects Recipes

Quick-paste expressions and preset notes for the Skiver / somengineer demo pipeline.

---

## Camera Shake

Apply to the **Position** property of a null object parented to the camera.

```javascript
// Shake Amp: link to a slider effect on the null (Effect > Expression Controls > Slider Control)
freq = 18;
amp = effect("Shake Amp")("Slider");
wiggle(freq, amp)
```

Keyframe the slider:
- Frame 289: value 0
- Frame 300: value 40 (peak)
- Frame 312: value 0

---

## Blink (Eyelid Opacity)

Apply to **Opacity** on the eyelid layer.

```javascript
blink_speed = 8;
v = Math.sin(time * blink_speed * Math.PI);
v < 0 ? 0 : v * 100
```

Disable expression to lock eyes open for non-blink moments.

---

## Breathing (Chest / Shoulder Scale)

Apply to **Scale** on a chest or shoulder null:

```javascript
breath_rate = 0.28;   // breaths per second
amp = 1.5;            // scale percent
[value[0] + Math.sin(time * breath_rate * 2 * Math.PI) * amp,
 value[1] + Math.sin(time * breath_rate * 2 * Math.PI) * amp]
```

---

## Bounce Ease (UI Reveal)

Apply to **Scale** on the UI panel layer. Requires at least one scale keyframe set.

```javascript
n = 0;
if (numKeys > 0){
  n = nearestKey(time).index;
  if (key(n).time > time) n--;
}
if (n == 0){ t = 0; v = value; }
else {
  t = time - key(n).time;
  v = velocityAtTime(key(n).time - thisComp.frameDuration / 10);
}
amp = 0.08; freq = 3.5; decay = 6;
v + amp * Math.sin(freq * 2 * Math.PI * t) * Math.exp(-decay * t)
```

---

## Depth of Field Pull (Focus Distance)

Apply to the camera's **Focus Distance** in a 3D comp:

```javascript
// Lerp focus between two null layers across time
start_dist = thisComp.layer("FocusStart").toWorld([0,0,0]);
end_dist   = thisComp.layer("FocusEnd").toWorld([0,0,0]);
t = linear(time, inPoint, outPoint, 0, 1);
lerp(length(toWorld([0,0,0]), start_dist),
     length(toWorld([0,0,0]), end_dist), t)
```

---

## Text Character Shuffle (UI Glitch)

Apply to **Source Text** on a text layer:

```javascript
chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
shuffle_end_frame = 420;
if (time * thisComp.frameRate < shuffle_end_frame) {
  result = "";
  for (i = 0; i < 8; i++) {
    result += chars[Math.floor(random() * chars.length)];
  }
  result
} else {
  text.sourceText
}
```

---

## Notes

- All expressions are compatible with AE 2022+.
- Use `Effect > Expression Controls > Slider Control` for any animatable expression parameter.
- Keep expressions on pre-comp layers where possible for organisation.
