import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { AdditiveBlending, Color, type Points } from 'three';
import { FRAGMENT_SHADER, VERTEX_SHADER } from './constants';

interface Props {
  n: number;
  l: number;
  color: string;
}

const COUNT = 150000 as const;

const createPositions = () => {
  const pos = new Float32Array(COUNT * 3);

  for (let i = 0; i < COUNT; i++) {
    // cbrt keeps points uniform in volume, so density comes from the shader, not the sampling
    const r = 12 * Math.cbrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = r * Math.cos(phi);
  }

  return pos;
};

const POSITIONS = createPositions();

export default function OrbitalCloud({ n, l, color }: Props) {
  const pointsRef = useRef<Points>(null);
  const dpr = useThree((state) => state.viewport.dpr);

  const uniforms = useMemo(
    () => ({
      uN: { value: n },
      uL: { value: l },
      uPixelRatio: { value: dpr },
      uColor: { value: new Color(color) },
    }),
    [color, dpr, l, n],
  );

  useFrame(() => {
    if (pointsRef.current) pointsRef.current.rotation.y += 0.001;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={POSITIONS.length / 3}
          array={POSITIONS}
          itemSize={3}
          args={[POSITIONS, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        uniforms={uniforms}
      />
    </points>
  );
}
