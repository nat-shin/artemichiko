# 🔌 Auditoría MCP — Estado, problemas y soluciones (2026-08-13)

Registro de la verificación uno-a-uno de todos los MCP configurados para el
proyecto, qué fallaba y cómo se resolvió.

## 🛠️ Problemas encontrados y solucionados

### 1. `vector-search` — `Operation timed out after 30000ms`

| Campo | Detalle |
|-------|---------|
| **Síntoma** | opencode cortaba la conexión con timeout de 30s |
| **Causa raíz** | El server `mcp-vector-search` v0.4.0 tarda **~16-45s** en el handshake `initialize` (carga índice BM25 + modelo embeddings `sentence-transformers/all-MiniLM-L6-v2` al arrancar). La config **no tenía `timeout`** → default 30s insuficiente |
| **Solución** | Añadir `"timeout": 180000` al bloque `vector-search` en `~/.config/opencode/opencode.json` |
| **Fuente oficial** | https://github.com/bobmatnyc/mcp-vector-search — verificado contra el README (setup/init/config) |
| **Verificación** | Handshake JSON-RPC `initialize` responde en 45.3s → `mcp-vector-search v0.4.0` |

### 2. `jcodemunch` — Recursión `uv run` 101×

| Campo | Detalle |
|-------|---------|
| **Síntoma** | El server no arrancaba: `error: uv run was recursively invoked 101 times` |
| **Causa raíz** | El wrapper `~/.local/bin/jcodemunch-mcp` era un script bash con `exec uv run jcodemunch-mcp "$@"` → uv resolvía el propio wrapper en PATH → bucle infinito |
| **Solución** | Reinstalar como uv tool: `uv tool install jcodemunch-mcp --force` (instala 3 binarios: gcm, jcodemunch-mcp, munch-bench) |
| **Fuente oficial** | https://github.com/jgravelle/jcodemunch-mcp |
| **Verificación** | Handshake `initialize` → `jcodemunch-mcp v1.29.0` |

### 3. `gitlab-mcp` — respuesta vacía en test (falso negativo)

| Campo | Detalle |
|-------|---------|
| **Síntoma** | Sin respuesta en test manual |
| **Causa raíz** | El test se lanzó **sin** `GITLAB_PERSONAL_ACCESS_TOKEN` → el server aborta con error en stderr. No es un bug de config |
| **Solución** | Ninguna — la config ya es correcta (token vía `{file:~/.secrets/zvn/GITLAB_TOKEN}`) |
| **Verificación** | Con token → `zereight-gitlab-mcp-server v2.1.46` |

### 4. Git push al repo artemichiko — `403 denied to UnivCabrera`

| Campo | Detalle |
|-------|---------|
| **Síntoma** | `remote: Permission to nat-shin/artemichiko.git denied to UnivCabrera` (403) |
| **Causa raíz** | El clon inicial se hizo por **HTTPS** → git resuelve las credenciales de la cuenta universitaria `UnivCabrera` (retirada, sin acceso) |
| **Solución** | `git remote set-url origin git@github.com:nat-shin/artemichiko.git` (SSH, id_ed25519) → autentica como **nat-shin** ✅ |
| **Regla creada** | Ver sección "Cuentas git" en AGENTS.md / CONSTITUCION.md — NUNCA HTTPS, siempre SSH |

## ✅ Estado final de cada MCP (verificado con handshake JSON-RPC)

### Locales — funcionando

| MCP | Versión | Tiempo handshake | Nota |
|-----|---------|:----------------:|------|
| github (MCP remoto) | — | — | Acceso a `nat-shin` verificado, repo artemichiko legible |
| narsil-mcp | v1.7.0 | 0.4s | `--repos` apuntando a ZVN |
| codebase-memory | v0.10.0 | 0.0s | — |
| code-review-graph | v3.4.2 | 4.4s | — |
| rust-docs | v0.1.1 | 0.1s | — |
| docsrs-mcp | v0.14.0 | 0.1s | — |
| lean-ctx | v3.6.8 | 0.2s | — |
| engram | v0.1.0 | 0.4s | — |
| scrapling | v1.28.1 | 3.0s | — |
| sequential-thinking | v0.2.0 | 2.6s | — |
| memory | v0.6.3 | 1.9s | — |
| tavily-mcp | v0.2.22 | 2.9s | — |
| playwright | v1.63.0 | 3.9s | — |
| filesystem | v0.2.0 | 3.7s | — |
| tauri-mcp | v0.12.0 | 3.5s | — |
| gitlab-mcp | v2.1.46 | — | requiere `GITLAB_PERSONAL_ACCESS_TOKEN` |
| vector-search | v0.4.0 | **45.3s** | ⚠️ timeout configurado a 180s |
| jcodemunch | v1.29.0 | 3.2s | reinstalado vía uv tool |

### Remotos — alcanzables

| MCP | URL | Código HTTP (GET) | Nota |
|-----|-----|:-----------------:|------|
| firecrawl | `https://mcp.firecrawl.dev/v2/mcp` | 405 | 405 en GET es normal — endpoint MCP (POST) |
| github | `https://api.githubcopilot.com/mcp/` | 401 | 401 sin header — con token funciona |
| context7 | `https://mcp.context7.com/mcp` | 405 | normal |
| exa | `https://mcp.exa.ai/mcp` | 405 | normal |
| linkup | `https://mcp.linkup.so/mcp` | 405 | normal |

### Deshabilitados (intencionalmente)

| MCP | Estado | Razón |
|-----|--------|-------|
| jenkins | `enabled: false` | No necesario para este proyecto |
| linkedin | `enabled: false` | No necesario para este proyecto |

## 📁 Archivos modificados

| Archivo | Cambio |
|---------|--------|
| `~/.config/opencode/opencode.json` | `vector-search` + `"timeout": 180000` |
| `~/.local/bin/jcodemunch-mcp` | reemplazado por instalación uv tool |
| `AGENTS.md` (proyecto + global) | regla dura: nunca HTTPS / nunca UnivCabrera |
| `CONSTITUCION.md` | Artículo XII enmendado (XII.1) |
| `AGENTS.md` (artemichiko, nuevo) | reglas del proyecto web |

## 🔧 Cómo se verificó (método)

1. Handshake JSON-RPC `initialize` contra cada server local (script Python con
   `select` + timeout) → mide tiempo real de respuesta y versión.
2. Conectividad HTTP para los MCP remotos (GET con curl, timeout 12s).
3. Comparación con la documentación oficial de cada repo en GitHub.
