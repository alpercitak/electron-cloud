import { useMemo, useRef } from 'react';
import { AdditiveBlending, Color, Points, ShaderMaterial } from 'three';
import { useFrame } from '@react-three/fiber';
import { FRAGMENT_SHADER, VERTEX_SHADER } from './constants';

interface Props {
  n: number;
  l: number;
  color: string;
}

const COUNT = 150000 as const;

export default function OrbitalCloud({ n, l, color }: Props) {
  const pointsRef = useRef<Points>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  const uniforms = useMemo(
    () => ({
      uN: { value: n },
      uL: { value: l },
      uColor: { value: new Color(color) },
      uTime: { value: 0 },
    }),
    [],
  );

  useFrame((state) => {
    const mat = pointsRef.current.material as ShaderMaterial;
    mat.uniforms.uN!.value = n;
    mat.uniforms.uL!.value = l;
    mat.uniforms.uColor!.value.set(color);
    mat.uniforms.uTime!.value = state.clock.getElapsedTime();
    pointsRef.current.rotation.y += 0.001;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
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
