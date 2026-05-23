#!/usr/bin/env bash
# Re-download landing images (Pexels). Run from apps/frontend: bash scripts/download-images.sh
set -euo pipefail
UA="Mozilla/5.0"
ROOT="$(cd "$(dirname "$0")/.." && pwd)/public/images"

curl -fsSL -L -A "$UA" -o "$ROOT/hero/campus.jpg" \
  "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1400"

declare -A DEST=(
  [germany]="1096334"
  [turkiye]="1794894"
  [japan]="1128318"
  [qatar]="325193"
  [uk]="460672"
  [us]="207691"
  [canada]="1438072"
  [australia]="3838381"
)
for name in "${!DEST[@]}"; do
  id="${DEST[$name]}"
  curl -fsSL -L -A "$UA" -o "$ROOT/destinations/${name}.jpg" \
    "https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=900"
done

echo "Done. Images saved under $ROOT"
