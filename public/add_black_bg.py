from PIL import Image
import os

files = ['fold-back.png', 'fold-cover.png', 'fold-inner.png']

for fname in files:
    path = fname
    if not os.path.exists(path):
        print(f"SKIP: {fname} not found")
        continue

    img = Image.open(path).convert("RGBA")
    bg = Image.new("RGBA", img.size, (0, 0, 0, 255))  # pure black background
    bg.paste(img, (0, 0), img)                          # paste phone on top using alpha
    result = bg.convert("RGB")                          # flatten to JPEG-safe RGB
    out = fname.replace('.png', '-black.jpg')
    result.save(out, 'JPEG', quality=95)
    print(f"Saved {out} ({img.size})")

print("Done.")
