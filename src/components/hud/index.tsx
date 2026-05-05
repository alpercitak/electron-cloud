import styles from './index.module.css';

export default function Hud() {
  return (
    <div className={styles.hud}>
      <div className={styles.hud__panel}>
        <h1 className={styles.hud__title}>Electron Cloud</h1>
        <p className={styles.hud__description}>Realtime orbital cloud simulation</p>
      </div>
    </div>
  );
}
