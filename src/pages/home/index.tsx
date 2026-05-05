import { Suspense } from 'react';
import { Leva, useControls } from 'leva';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import Hud from '../../components/hud';
import Loader from '../../components/loader';
import OrbitalCloud from '../../components/orbital-cloud';
import styles from './index.module.css';

export default function Home() {
  const { n, l, color } = useControls({
    n: { value: 2, min: 1, max: 4, step: 1 },
    l: { value: 1, min: 0, max: 2, step: 1 },
    color: '#4db6ac',
  });

  return (
    <div className={styles.home}>
      <Hud />

      <Leva theme={{ colors: { accent1: '#4db6ac', elevation1: '#111' } }} />

      <Canvas camera={{ position: [0, 0, 15] }}>
        <Suspense fallback={<Loader />}>
          <OrbitalCloud n={n} l={l} color={color} />
          <EffectComposer>
            <Bloom luminanceThreshold={0.2} intensity={1.5} />
          </EffectComposer>
          <OrbitControls enablePan={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}
