# Electron Cloud

![React](https://img.shields.io/badge/React-000000?style=flat-square&logo=react&logoColor=61DAFB)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=three.js&logoColor=white)
![R3F](https://img.shields.io/badge/R3F-000000?style=flat-square&logo=react&logoColor=white)
![Build](https://img.shields.io/github/actions/workflow/status/alpercitak/electron-cloud/build.yaml?style=flat-square&label=&color=2ea44f)
![License](https://img.shields.io/badge/MIT-2ea44f?style=flat-square)

An interactive 3D visualizer for orbital-inspired electron clouds. It blends simplified quantum-mechanics motifs with real-time shader rendering so you can explore how changing `n` and `l` affects the overall cloud shape.

**Live demo: [electron-cloud.pages.dev](https://electron-cloud.pages.dev/)**

## Features

- **Interactive Quantum Controls:** Change `n` and `l` in real time and watch the cloud reshape instantly. `l` is kept below `n`, and the camera reframes to fit each orbital.
- **GPU-Driven Point Cloud:** Renders 150,000 particles with custom GLSL shaders and additive blending.
- **Orbital-Inspired Math:** Uses a simplified radial-plus-angular probability approximation to evoke familiar `s`, `p`, and `d`-like forms.
- **Minimal Control Panel:** Lightweight controls for experimenting with orbital parameters and color.

## Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **3D Engine:** [Three.js](https://threejs.org/) / [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **Runtime:** [Bun](https://bun.sh/)
- **Language:** TypeScript
- **Controls:** Leva
- **Tooling:** Vite, Biome

## The Physics

In quantum mechanics, electrons do not follow defined paths. Instead, they exist as a probability density defined by the wave function $\psi$. This project calculates:

1. **Radial Falloff:** $r^l e^{-r/n}$, rescaled so its peak (at $r = l \cdot n$) is 1 for every `n` and `l`. This keeps brightness comparable across orbitals; it is not the physical $\int |\psi|^2 = 1$ normalization.
2. **Angular Shape:** $|\cos\theta|$ for `l = 1` and $|3\cos^2\theta - 1| / 2$ for `l = 2`, measured from the vertical axis, giving spherical, dumbbell, and dumbbell-with-ring silhouettes (the `m = 0` shapes).

Particles are scattered uniformly through a sphere, so on-screen density comes from the shader's probability term rather than the sampling. Low-probability points are faded or discarded to create the cloud effect.

This is best understood as a visual approximation rather than a fully rigorous hydrogen-orbital solver: it does not model the magnetic quantum number `m` (only `m = 0` shapes), true normalization, or the radial nodes of the full Schrödinger solution, and `l` is limited to 2.

## Installation & Setup

Ensure you have [Bun](https://bun.sh/) installed.

```bash
# Install dependencies
bun install

# Run development server
bun run dev

# Lint and format check (Biome)
bun run check

# Production build
bun run build
```
