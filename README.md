# Electron Cloud

![React](https://img.shields.io/badge/React-000000?style=flat-square&logo=react&logoColor=61DAFB)
![R3F](https://img.shields.io/badge/R3F-000000?style=flat-square&logo=react&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=three.js&logoColor=white)
![Build](https://img.shields.io/github/actions/workflow/status/alpercitak/electron-cloud/build.yaml?branch=main&label=Build&color=4ade80&style=flat-square)
![License](https://img.shields.io/badge/License-MIT-4ade80?style=flat-square)

An interactive 3D visualizer for orbital-inspired electron clouds. It blends simplified quantum-mechanics motifs with real-time shader rendering so you can explore how changing `n` and `l` affects the overall cloud shape.

## Features
- **Interactive Quantum Controls:** Change `n` and `l` in real time and watch the cloud reshape instantly.
- **GPU-Driven Point Cloud:** Renders 150,000 particles with custom GLSL shaders and additive blending.
- **Orbital-Inspired Math:** Uses a simplified radial-plus-angular probability approximation to evoke familiar `s`, `p`, and `d`-like forms.
- **Minimal Control Panel:** Lightweight controls for experimenting with orbital parameters and color.

## Tech Stack
- **Framework:** [React 19](https://react.dev/)
- **3D Engine:** [Three.js](https://threejs.org/) / [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **Runtime:** [Bun](https://bun.sh/)
- **Language:** TypeScript
- **Controls:** Leva

## The Physics
In quantum mechanics, electrons do not follow defined paths. Instead, they exist as a probability density defined by the wave function $\psi$. This project calculates:

1. **Radial Falloff:** A simplified decay term that changes with principal quantum number `n`.
2. **Angular Shape:** A lightweight angular approximation that produces spherical, dumbbell-like, and clover-like silhouettes from `l`.

The visualizer scatters particles in 3D space and evaluates an approximate probability term in the shader, fading or discarding low-probability regions to create the cloud effect.

This is best understood as a visual approximation rather than a fully rigorous hydrogen-orbital solver: it does not currently model the magnetic quantum number `m`, exact normalization, or radial nodes from the full Schrödinger solution.

## Installation & Setup

Ensure you have [Bun](https://bun.sh/) installed.

```bash
# Install dependencies
bun install

# Run development server
bun run dev
