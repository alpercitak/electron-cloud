import { lazy, Suspense } from 'react';
import Hud from '@/components/hud';
import Loader from '@/components/loader';
import styles from './index.module.css';

const Scene = lazy(() => import('@/components/scene'));

export default function Home() {
  return (
    <div className={styles.home}>
      <Hud />
      <Suspense fallback={<Loader />}>
        <Scene />
      </Suspense>
    </div>
  );
}
