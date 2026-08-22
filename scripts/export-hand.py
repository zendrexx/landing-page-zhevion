# Build the hero's hand + phone assets from the masters.
#
#   python scripts/export-hand.py
#
# Produces two files and the numbers that tie them together:
#
#   public/hero/hand-phone.png    the cropped, upscaled hand
#   public/hero/zebite-home.webp  the Zebite capture, re-banded to the exact
#                                 aspect of the mockup's screen
#
# and prints HAND_SCREEN_RECT for lib/content.ts. This script is the only thing
# allowed to set those four percentages — re-run it if a master ever changes.
#
# --- The hand -----------------------------------------------------------------
# The master is 1584x672 but the hand only occupies a 370x562 island in the
# middle; the rest is fully transparent. Shipping the whole canvas would mean
# laying out an element that is 76% empty, which makes positioning the phone in
# a composition guesswork. So we crop to the alpha box, then upscale 2x with
# LANCZOS + a mild unsharp pass. 370px of source is not enough for a ~550px
# on-screen hand on a 2x display; we cannot invent detail, but resampling once
# here with a good kernel beats letting the browser do it at paint time.
#
# Note the master's alpha box bottoms out at the image's own bottom edge: the
# wrist is already cut off. That is deliberate and load-bearing — anchoring the
# crop to the bottom of its container is what makes the hand read as rising into
# frame rather than floating as a sticker.
#
# --- Finding the screen -------------------------------------------------------
# The screen is a flat grey plate, but the bezel around it is a GRADIENT of
# greys (24, 36, 48, 60, 72 going in; 96, 120, 144, 192 on the highlight edge).
# A naive "is this pixel grey-ish" test therefore swallows the bezel and returns
# a rect larger than the phone's screen — which shows up on the page as the UI
# bleeding over the bezel and past the phone's silhouette.
#
# So: match only the plate's own narrow value band, then take the longest
# CONTIGUOUS run per row and column and use the median of the full-length ones.
# Contiguity is what rejects stray matches elsewhere in the frame.

from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
HAND_SRC = ROOT / "assets" / "images" / "hand with phone placeholder.png"
HAND_OUT = ROOT / "public" / "hero" / "hand-phone.png"

SCREEN_SRC = ROOT / "public" / "screens" / "grocery" / "light" / "10_home.webp"
SCREEN_OUT = ROOT / "public" / "hero" / "zebite-home.webp"

SCALE = 2

# The flat plate sits at ~84-88. Everything outside this band is bezel.
PLATE_LO, PLATE_HI = 80, 92
MIN_RUN = 40


def longest_run(mask):
    """(length, start, end) of the longest contiguous True run in a 1-D mask."""
    best_len, best = 0, (None, None)
    start = None
    for i, on in enumerate(mask):
        if on and start is None:
            start = i
        elif not on and start is not None:
            if i - start > best_len:
                best_len, best = i - start, (start, i - 1)
            start = None
    if start is not None and len(mask) - start > best_len:
        best_len, best = len(mask) - start, (start, len(mask) - 1)
    return best_len, best[0], best[1]


def find_screen(img):
    """Bounding box of the phone's blank screen, in source pixels."""
    a = np.array(img)
    r, g, b, alpha = (a[..., i].astype(int) for i in range(4))
    plate = (
        (alpha > 250)
        & (abs(r - g) < 6)
        & (abs(g - b) < 6)
        & (r >= PLATE_LO)
        & (r <= PLATE_HI)
    )

    rows, cols = {}, {}
    for y in range(plate.shape[0]):
        n, s, e = longest_run(plate[y])
        if n > MIN_RUN:
            rows[y] = (s, e, n)
    for x in range(plate.shape[1]):
        n, s, e = longest_run(plate[:, x])
        if n > MIN_RUN:
            cols[x] = (s, e, n)
    if not rows or not cols:
        raise SystemExit("No screen plate found — has the master changed?")

    widest = max(v[2] for v in rows.values())
    tallest = max(v[2] for v in cols.values())
    full_rows = [v for v in rows.values() if v[2] >= widest - 1]
    full_cols = [v for v in cols.values() if v[2] >= tallest - 1]

    left = int(np.median([v[0] for v in full_rows]))
    right = int(np.median([v[1] for v in full_rows])) + 1
    top = int(np.median([v[0] for v in full_cols]))
    bottom = int(np.median([v[1] for v in full_cols])) + 1

    # Corner radius = how far down before a row first reaches full width.
    radius = next(
        (y - top for y in sorted(rows) if y >= top and rows[y][2] >= widest - 1), 0
    )
    return (left, top, right, bottom), radius


def band_to_aspect(img, aspect):
    """
    Extend an app capture's top and bottom to hit `aspect` (w/h) exactly.

    The mockup's screen is narrower than the capture, so object-cover would
    otherwise shave ~3.5% off each side and eat the UI's side margins. Rather
    than crop the design, we add height by repeating the capture's first and
    last rows — the same trick scripts/export-screens.py already uses to build
    device chrome bands, and seamless here because both edges are flat colour.
    """
    w, h = img.size
    target_h = round(w / aspect)
    if target_h <= h:
        return img  # already tall enough; cover will crop vertically, which is fine
    extra = target_h - h
    top_pad = extra // 2
    bottom_pad = extra - top_pad

    out = Image.new(img.mode, (w, target_h))
    out.paste(img.crop((0, 0, w, 1)).resize((w, top_pad), Image.NEAREST), (0, 0))
    out.paste(img, (0, top_pad))
    out.paste(
        img.crop((0, h - 1, w, h)).resize((w, bottom_pad), Image.NEAREST),
        (0, top_pad + h),
    )
    return out


def main() -> None:
    img = Image.open(HAND_SRC).convert("RGBA")

    bbox = img.getbbox()
    if bbox is None:
        raise SystemExit("Master is fully transparent.")

    (sx0, sy0, sx1, sy1), radius = find_screen(img)
    cx0, cy0, cx1, cy1 = bbox
    cw, ch = cx1 - cx0, cy1 - cy0
    sw, sh = sx1 - sx0, sy1 - sy0

    cropped = img.crop(bbox)
    out = cropped.resize((cw * SCALE, ch * SCALE), Image.LANCZOS)
    # Gentle: enough to recover the edge LANCZOS softens, not enough to halo the
    # hand's silhouette against a light background.
    out = out.filter(ImageFilter.UnsharpMask(radius=1.4, percent=60, threshold=3))
    HAND_OUT.parent.mkdir(parents=True, exist_ok=True)
    out.save(HAND_OUT, optimize=True)

    screen = Image.open(SCREEN_SRC).convert("RGB")
    rebanded = band_to_aspect(screen, sw / sh)
    rebanded.save(SCREEN_OUT, quality=92, method=6)

    print(f"master      {img.size[0]} x {img.size[1]}")
    print(f"alpha bbox  {bbox}  ->  {cw} x {ch}")
    print(f"wrote       {HAND_OUT.relative_to(ROOT)}  {out.size[0]} x {out.size[1]}")
    print(f"screen      x {sx0}..{sx1 - 1}  y {sy0}..{sy1 - 1}   {sw} x {sh}")
    print(f"            aspect {sw / sh:.4f}   corner radius ~{radius}px")
    print(f"wrote       {SCREEN_OUT.relative_to(ROOT)}  {rebanded.size[0]} x {rebanded.size[1]}"
          f"  (from {screen.size[0]} x {screen.size[1]})")
    print()
    print("HAND_SCREEN_RECT — screen as % of the exported hand image:")
    print(f"  left:   {(sx0 - cx0) / cw * 100:.3f}")
    print(f"  top:    {(sy0 - cy0) / ch * 100:.3f}")
    print(f"  width:  {sw / cw * 100:.3f}")
    print(f"  height: {sh / ch * 100:.3f}")
    print("PhoneScreen border-radius:")
    print(f"  {radius / sw * 100:.2f}% / {radius / sh * 100:.2f}%")


if __name__ == "__main__":
    main()
