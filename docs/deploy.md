# Despliegue en Cloudflare — ArteMichiko

El sitio es **estático** (Astro `output: 'static'` + adaptador `@astrojs/cloudflare`) y se sirve desde **Cloudflare Workers Static Assets** (compatibilidad con Pages). No hay worker runtime, base de datos ni variables de entorno.

## 1. Autenticación con Wrangler

```bash
# Desde apps/web (wrangler es devDependency del workspace)
cd apps/web
npx wrangler login
```

## 2. Build

```bash
pnpm build          # genera apps/web/dist/
```

El build incluye automáticamente:

- `public/_headers` → headers de seguridad aplicados por Cloudflare
- `public/robots.txt`, `llms.txt`, `llms-full.txt`
- `sitemap-index.xml` (integración `@astrojs/sitemap`)

## 3. Deploy

```bash
cd apps/web
npx wrangler pages deploy dist --project-name artemichiko
```

El nombre del proyecto (`artemichiko`) debe coincidir con el existente en el dashboard de Cloudflare. La primera vez, Wrangler te pedirá confirmar la creación.

### Deploy a producción vs. preview

```bash
# Producción (branch main)
npx wrangler pages deploy dist --project-name artemichiko --branch main

# Preview (cualquier otro branch)
npx wrangler pages deploy dist --project-name artemichiko --branch preview
```

## 4. Dominio y configuración

- Dominio canónico: `https://artemichiko.com` (declarado en `astro.config.mjs` como `site`).
- DNS y SSL los gestiona Cloudflare; no hay configuración adicional en el repo.
- El servicio de imágenes usa el binding `cloudflare-binding` del adaptador (ver `astro.config.mjs`); no requiere imágenes externas salvo los hosts declarados en CSP (`placehold.co`, `i.ytimg.com`).

## 5. Verificación post-deploy

```bash
./scripts/qa-lighthouse.sh https://artemichiko.com   # Lighthouse + PSI (CrUX)
curl -I https://artemichiko.com                       # verificar headers (HSTS, CSP, XFO)
curl -s https://artemichiko.com/robots.txt            # bots IA permitidos
```

## Notas

- **CI/CD:** no hay pipeline configurado en el repo; el deploy es manual desde una máquina con `wrangler login`. Para automatizar, usar `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` en CI (Wrangler los lee del entorno).
- **Rollback:** Cloudflare Pages conserva los deploys anteriores en el dashboard; un rollback es seleccionar el deploy previo, no un push de git.
- **Cambios de infraestructura** (headers, robots, CSP) deben desplegarse junto con el build que los genera — nunca editar `public/` sin reconstruir.
