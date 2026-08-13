# ArteMichiko — AGENTS.md

> Reglas de trabajo para agentes de IA en el proyecto ArteMichiko (sitio web).

## 🏗️ CUENTAS GIT — nat-shin es la única cuenta (NO UnivCabrera)

> ⚠️ Regla dura 2026-08-13: **prohibido usar/autenticar con la cuenta
> UnivCabrera**. Es una cuenta universitaria ajena al proyecto; **ya no se
> usa**. Todas las operaciones git de ArteMichiko usan la cuenta **nat-shin**.

Reglas:
1. **Remote**: `git@github.com:nat-shin/artemichiko.git` — SIEMPRE vía **SSH**
   (clave `id_ed25519`). **NUNCA HTTPS** — el HTTPS resuelve las credenciales
   de UnivCabrera (403/404) y rompe push/clone.
2. **Verificación**: antes de cualquier push, `git remote -v` debe mostrar
   `git@github.com:nat-shin/...`. Si aparece `https://github.com/...`,
   corregir: `git remote set-url origin git@github.com:nat-shin/<repo>.git`.
3. **Tokens**: el token de `UnivCabrera` NO tiene acceso a este repo. Para
   operaciones API (issues, PRs, releases) usar solo token/cuenta de
   `nat-shin`.
4. **Commit atómico**: `git add <paths explícitos>` — NUNCA `git add -A`.

## 📦 Estructura del proyecto

- `6-ArteMichiko_Estrategia_Digital_Definitiva.md` — estrategia digital (base)
- `7-ArteMichiko_Posicionamiento_Digital_Stack_y_UXUI.md` — posicionamiento, stack, UX/UI (base)
- `8-ArteMichiko_Arquitectura_de_Vanguardia_2026.md` — arquitectura 2026 (base)
- `historico/` — versiones anteriores (NO versionar, ignorado en .gitignore)
