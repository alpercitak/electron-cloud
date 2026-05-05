import { Html, useProgress } from '@react-three/drei';
import styles from './index.module.css';

export default function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className={styles.loader}>
        <div className={styles.loader__spinner}></div>
        <div className={styles.loader__text}>Initializing Quantum State {progress.toFixed(0)}%</div>
      </div>
    </Html>
  );
}
