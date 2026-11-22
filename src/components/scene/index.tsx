import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Leva, useControls } from 'leva';
import { useEffect, useRef } from 'react';
import { MathUtils } from 'three';
import OrbitalCloud from '@/components/orbital-cloud';
import { visibleRadius } from '@/components/orbital-cloud/constants';

const LEVA_FONT = "'Space Grotesk', system-ui, sans-serif" as const;
const CAMERA_FOV = 75;
const FIT_MARGIN = 1.15;

// Eases the camera distance so the orbital fills the view; leaves the user's angle and zoom alone otherwise
function CameraFit({ radius }: { radius: number }) {
  const aspect = useThree((state) => state.size.width / state.size.height);
  const targetDistance = useRef(0);

  useEffect(() => {
    const halfV = MathUtils.degToRad(CAMERA_FOV / 2);
    const halfH = Math.atan(Math.tan(halfV) * aspect);
    targetDistance.current = (radius * FIT_MARGIN) / Math.sin(Math.min(halfV, halfH));
  }, [radius, aspect]);

  useFrame(({ camera }, delta) => {
    if (!targetDistance.current) return;
    const distance = MathUtils.damp(camera.position.length(), targetDistance.current, 4, delta);
    camera.position.setLength(distance);
    if (Math.abs(distance - targetDistance.current) < 0.01) targetDistance.current = 0;
  });

  return null;
}

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
      <Canvas camera={{ fov: CAMERA_FOV, position: [0, 0, 15] }}>
        <OrbitalCloud n={n} l={l} color={color} />
        <CameraFit radius={visibleRadius(n, l)} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} intensity={1.5} />
        </EffectComposer>
        <OrbitControls enablePan={false} />
      </Canvas>
    </>
  );
}
