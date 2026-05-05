import styles from './index.module.css';

export default function Loader() {
  return (
    <div className={styles.loader}>
      <div className={styles.loader__spinner}></div>
      <div className={styles.loader__text}>Initializing Quantum State</div>
    </div>
  );
}
