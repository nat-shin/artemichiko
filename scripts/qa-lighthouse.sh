#!/usr/bin/env bash
# ArteMichiko — QA de performance (Lighthouse + PageSpeed Insights API)
# Uso: ./scripts/qa-lighthouse.sh [URL]
# Por defecto audita http://localhost:4321 (dev) — pasar URL de producción para CrUX.
set -euo pipefail

URL="${1:-http://localhost:4321}"
OUTDIR=".qa/$(date +%Y%m%d-%H%M%S)"
mkdir -p "$OUTDIR"

echo "🔍 Auditando: $URL"
echo "📁 Resultados en: $OUTDIR"

# ── Lighthouse (local, Node module oficial de Google) ──
echo "── Lighthouse (móvil) ──"
pnpm --filter @artemichiko/web exec lighthouse "$URL" \
  --output=html --output=json \
  --output-path="$OUTDIR/lighthouse-mobile" \
  --chrome-flags="--headless --no-sandbox" \
  --only-categories=performance,accessibility,best-practices,seo \
  --quiet 2>&1 | grep -E "Performance|Accessibility|Best Practices|SEO|Error|error" || true

# ── PageSpeed Insights API (25k queries/día gratis, incluye datos CrUX reales) ──
echo "── PageSpeed Insights (campo real, CrUX) ──"
API_KEY="${PSI_API_KEY:-}" # opcional: la API funciona sin key para cuota limitada
if [ -n "$API_KEY" ]; then
  PSI_URL="https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${URL}&strategy=mobile&key=${API_KEY}"
else
  PSI_URL="https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${URL}&strategy=mobile"
fi
curl -s "$PSI_URL" -o "$OUTDIR/psi-mobile.json" || true
python3 - << PYEOF
import json, sys
try:
    d = json.load(open("$OUTDIR/psi-mobile.json"))
    if "lighthouseResult" in d:
        cats = d["lighthouseResult"]["categories"]
        for name in ["performance", "accessibility", "best-practices", "seo"]:
            c = cats.get(name, {})
            print(f"  {name}: {round(c.get('score', 0) * 100)}/100")
    elif "error" in d:
        print(f"  PSI error: {d['error'].get('message', 'unknown')}")
except Exception as e:
    print(f"  (PSI no disponible para URL local: {e})")
PYEOF

echo "✅ QA completo. Abre $OUTDIR/lighthouse-mobile.html para el reporte detallado."
