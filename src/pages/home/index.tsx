import { lazy, Suspense } from 'react';
import { Leva } from 'leva';
import Hud from '@/components/hud';
import Loader from '@/components/loader';
import styles from './index.module.css';

const Scene = lazy(() => import('@/components/scene'));

export default function Home() {
  return (
    <div className={styles.home}>
      <Hud />
      <Leva theme={{ colors: { accent1: '#4db6ac', elevation1: '#111' } }} />
      <Suspense fallback={<Loader />}>
        <Scene />
      </Suspense>
    </div>
  );
}
