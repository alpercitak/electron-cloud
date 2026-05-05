# Electron Cloud

An interactive, high-fidelity 3D visualizer for atomic orbitals. This project bridges the gap between quantum mechanics and creative coding, allowing users to explore the "mist" of electron probability densities in real-time.


## Features
- **Real-time Orbital Morphing:** Change quantum numbers ($n, l, m$) and watch the electron cloud reshape instantly.
- **GPU-Accelerated Shaders:** Renders 150,000+ particles at 60 FPS by offloading wave-function math to custom GLSL fragment and vertex shaders.
- **Scientific Accuracy:** Uses the radial and angular components of the Schrödinger wave function to determine particle distribution.
- **Glassmorphism UI:** A sleek, minimalist HUD built with React and CSS Modules (BEM) for a laboratory feel.

## Tech Stack
- **Framework:** [React 18](https://reactjs.org/)
- **3D Engine:** [Three.js](https://threejs.org/) / [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **Runtime:** [Bun](https://bun.sh/)
- **Language:** TypeScript
- **Styling:** CSS Modules + BEM

## The Physics
In quantum mechanics, electrons do not follow defined paths. Instead, they exist as a probability density defined by the wave function $\psi$. This project calculates:

1. **Radial Probability:** The likelihood of finding an electron at a distance $r$ from the nucleus.
2. **Angular Probability:** The "shape" of the orbital (Spherical, Dumbbell, Clover) based on spherical harmonics.

The visualizer uses a **Monte Carlo-inspired approach** in the fragment shader to `discard` points where the probability $|\psi|^2$ is low, creating the iconic "cloud" effect.

## Installation & Setup

Ensure you have [Bun](https://bun.sh/) installed.

```bash
# Install dependencies
bun install

# Run development server
bun run dev
