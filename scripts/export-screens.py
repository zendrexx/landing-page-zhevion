# Build the site's Zebite screenshot set from the v4 masters.
#
#   python scripts/export-screens.py
#
# The masters in assets/screens/grocery-v4/ are raw Android captures at
# 2580 x 5592: they carry the OS status bar (clock, Wi-Fi, battery) at the top
# and the gesture bar at the bottom. Shipping those inside an iPhone frame is
# wrong twice over — Android chrome on an iPhone, and no Dynamic Island.
#
# So, for every screen listed below, in both themes:
#   1. crop the Android status bar (144px) and gesture bar (132px) away — the
#      DeviceFrame draws its own island and home indicator instead,
#   2. downscale 2580px -> 840px (enough for the largest frame on the page,
#      ~280 CSS px, at 3x),
#   3. extend the first/last kept row into a top/bottom band the size of the
#      device's own chrome, so the island has somewhere to sit that isn't on
#      top of the app's header — and so light AND dark shots meet the bezel in
#      their own background colour. A fixed cream band would seam against the
#      dimmed scrim behind a sheet (see 41_add_to_pantry),
#   4. save WebP to public/screens/grocery/{light,dark}/.
#
# Only the .webp files ship; the masters never reach public/, which keeps 44 MB
# of PNG out of the deploy. Adding a screen to lib/content.ts means adding its
# name to SCREENS here and re-running.
#
# Mirrors landing_page_grocery/assets/screens/v4/export_web.py, which does the
# same job for the Zebite product page — same crops, same bands, so a screen
# looks identical on both sites.

import os
from PIL import Image

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
SRC = os.path.join(ROOT, "assets", "screens", "grocery-v4")
DST = os.path.join(ROOT, "public", "screens", "grocery")

CROP_TOP, CROP_BOTTOM = 144, 132   # 24dp status bar, 22dp gesture bar @ dpr 6
WIDTH = 840
BAND_TOP, BAND_BOTTOM = 48, 22     # must match DeviceFrame's band* constants
QUALITY = 82

# The screens lib/content.ts renders, light set. Dark is exported alongside so
# the site can switch themes with one edit in content.ts.
SCREENS = [
    "10_home",
    "20_plan",
    "21_plan_recipe",
    "30_grocery",
    "40_pantry",
    "41_add_to_pantry",
    "50_insights",
    "71_zeb_chat",
]


def build(theme, name):
    im = Image.open(os.path.join(SRC, theme, name + ".png")).convert("RGB")
    w, h = im.size

    im = im.crop((0, CROP_TOP, w, h - CROP_BOTTOM))
    im = im.resize((WIDTH, round(im.size[1] * WIDTH / w)), Image.LANCZOS)

    out = Image.new("RGB", (WIDTH, im.size[1] + BAND_TOP + BAND_BOTTOM))
    out.paste(im, (0, BAND_TOP))
    out.paste(im.crop((0, 0, WIDTH, 1)).resize((WIDTH, BAND_TOP)), (0, 0))
    out.paste(
        im.crop((0, im.size[1] - 1, WIDTH, im.size[1])).resize((WIDTH, BAND_BOTTOM)),
        (0, BAND_TOP + im.size[1]),
    )

    dst_dir = os.path.join(DST, theme)
    os.makedirs(dst_dir, exist_ok=True)
    dst = os.path.join(dst_dir, name + ".webp")
    out.save(dst, "WEBP", quality=QUALITY, method=6)
    return out.size, os.path.getsize(dst)


if __name__ == "__main__":
    total = 0
    size = None
    for theme in ("light", "dark"):
        for name in SCREENS:
            size, nbytes = build(theme, name)
            total += nbytes
            print("%-6s %-20s %5.0f KB" % (theme, name, nbytes / 1024))
    print("\n%d files, %s px each, %.1f MB total"
          % (len(SCREENS) * 2, "x".join(map(str, size)), total / 1048576))
