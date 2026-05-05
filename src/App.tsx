import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useControls, Leva } from 'leva';
import Hud from './components/hud';
import OrbitalCloud from './components/orbital-cloud';
import styles from './App.module.css';

export default function App() {
  const { n, l, color } = useControls({
    n: { value: 2, min: 1, max: 4, step: 1 },
    l: { value: 1, min: 0, max: 2, step: 1 },
    color: '#4db6ac',
  });

  return (
    <div className={styles.app}>
      <Hud />

      <Leva theme={{ colors: { accent1: '#4db6ac', elevation1: '#111' } }} />

      <Canvas camera={{ position: [0, 0, 15] }}>
        <OrbitalCloud n={n} l={l} color={color} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} intensity={1.5} />
        </EffectComposer>
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
}
