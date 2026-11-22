import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Leva, useControls } from 'leva';
import { useEffect } from 'react';
import OrbitalCloud from '@/components/orbital-cloud';

const LEVA_FONT = "'Space Grotesk', system-ui, sans-serif" as const;

export default function Scene() {
  const { n } = useControls({ n: { value: 2, min: 1, max: 4, step: 1 } });
  // l must stay below n; the shader only has shapes up to l = 2
  const [{ l, color }, set] = useControls(
    () => ({ l: { value: 1, min: 0, max: Math.min(n - 1, 2), step: 1 }, color: '#4db6ac' }),
    [n],
  );
  // Leva doesn't clamp the current value when max shrinks
  useEffect(() => {
    if (l >= n) set({ l: n - 1 });
  }, [l, n, set]);

  return (
    <>
      <Leva
        theme={{
          colors: { accent1: '#4db6ac', elevation1: '#111' },
          fonts: { mono: LEVA_FONT, sans: LEVA_FONT },
        }}
      />
      <Canvas camera={{ position: [0, 0, 15] }}>
        <OrbitalCloud n={n} l={l} color={color} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} intensity={1.5} />
        </EffectComposer>
        <OrbitControls enablePan={false} />
      </Canvas>
    </>
  );
}
