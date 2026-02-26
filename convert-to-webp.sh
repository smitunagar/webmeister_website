#!/bin/bash
# Convert all images in public/ to WebP format and save in the same folder.
# Requires: brew install webp (provides cwebp and gif2webp)

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PUBLIC_DIR="${SCRIPT_DIR}/public"
QUALITY=85

if [[ ! -d "$PUBLIC_DIR" ]]; then
    echo "Error: public/ folder not found at $PUBLIC_DIR"
    exit 1
fi

# Check for cwebp (part of webp package: brew install webp)
if ! command -v cwebp &> /dev/null; then
    echo "Error: cwebp not found. Install with: brew install webp"
    exit 1
fi

# Optional: gif2webp for animated GIFs (same package)
HAS_GIF2WEBP=false
command -v gif2webp &> /dev/null && HAS_GIF2WEBP=true

convert_static() {
    local src="$1"
    local base="${src%.*}"
    local ext="${src##*.}"
    local dest="${base}.webp"
    [[ "$src" == "$dest" ]] && return
    echo "  → $src"
    # Logos: resize to max 800px first so subtitle stays sharp at 50px display height
    if [[ "$base" == Logo_Web || "$base" == "Logo-05" ]]; then
        local tmp="${base}_resized_for_web.${ext}"
        if command -v sips &> /dev/null; then
            sips -Z 800 "$src" --out "$tmp" 2>/dev/null && cwebp -lossless "$tmp" -o "$dest" && rm -f "$tmp"
        else
            cwebp -lossless "$src" -o "$dest"
        fi
    else
        cwebp -q "$QUALITY" "$src" -o "$dest"
    fi
}

convert_gif() {
    local src="$1"
    local base="${src%.*}"
    local dest="${base}.webp"
    echo "  → $src"
    if [[ "$HAS_GIF2WEBP" == true ]]; then
        gif2webp -q "$QUALITY" "$src" -o "$dest"
    else
        # Fallback: cwebp only converts first frame
        cwebp -q "$QUALITY" "$src" -o "$dest"
    fi
}

cd "$PUBLIC_DIR"
# When no files match a glob, expand to nothing (avoid literal "*.png")
shopt -s nullglob 2>/dev/null || true

echo "Converting images in $PUBLIC_DIR to WebP (quality $QUALITY)..."
echo ""

count=0
for ext in png jpg jpeg; do
    for f in *."$ext"; do
        [[ -f "$f" ]] || continue
        convert_static "$f"
        count=$((count + 1))
    done
done
for f in *.gif; do
    [[ -f "$f" ]] || continue
    convert_gif "$f"
    count=$((count + 1))
done

echo ""
echo "Done. Converted $count image(s) to WebP in public/."
