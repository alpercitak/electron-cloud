# Electron Cloud

Single Vite + React + React Three Fiber + TypeScript SPA. One scene: a shader-driven point cloud approximating atomic orbitals, tuned live with Leva.

- Use Bun for dependencies and package scripts.
- Use `@/` for `src/`-relative imports.
- For review, diagnosis, or planning, inspect only. For implementation, preserve unrelated user changes.

## Layout

- `src/main.tsx`: entry. `src/pages/home/`: page shell, lazy-loads the scene.
- `src/components/scene/`: `<Canvas>`, Leva controls, postprocessing, camera controls.
- `src/components/orbital-cloud/`: the point cloud. `index.tsx` builds geometry and uniforms; `constants.ts` holds the GLSL shaders.
- `src/components/{hud,loader}/`: app chrome.
- Each component is `index.tsx` + `index.module.css` (one CSS Module per component). Global styles live in `src/styles/global.css`.

## Implementation

Treat additional code as a cost.
Smallest change that solves the actual task.
Follow existing patterns.
No hypothetical future requirements, no unrelated refactors, no wrapper/factory/dependency for a single use unless it removes concrete complexity today.
Small duplication beats premature abstraction.
Default, not absolute — if the task genuinely needs structure, build it and say why in one line.
Scope is the task, nothing more.
Worth doing but out of scope → mention it, don't implement it.
If the issue is ambiguous, follow existing convention.

## Defensive Programming

Trust internal TypeScript invariants. No assertions/guards/validation/fallbacks for states this codebase already controls, unless you can name the concrete failure prevented. Validate only at real trust boundaries: user input, network/API responses, persisted data, platform APIs. Handle errors only with a real recovery path — otherwise let them propagate. Don't invent recovery, don't swallow, don't build infra for it.

## TypeScript / React / R3F

Precise types over runtime checks — no `any`, no unnecessary assertions, no non-null assertions where the type can be modeled correctly. No state unless it affects render/behavior. No derived state duplication. No effect where derivation works. No memoization without a concrete problem.
Prefer declarative R3F JSX over imperative Three setup. Keep hot-path animation state in refs, not React state. Don't allocate Three objects inside `useFrame` when they can be updated in place. Dispose anything created imperatively.

## Stopping

Implement, verify with checks, stop. Don't keep hardening or generalizing once it's done — note anything extra you noticed, don't build it.

## Before Finishing

Verify with `bun run build` and `bun run check` (Biome).
Commit in small, feature-based Conventional Commits (`fix(orbital-cloud): …`, `refactor: …`); no attribution trailers.
Cut from your own diff: unneeded abstractions, redundant guards, one-use helpers, speculative config, unrelated changes, obvious-code comments. Equal correctness → ship the smaller one.
