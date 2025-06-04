import React from 'react';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner: React.FC = () => (
  <div className={styles.spinnerContainer}>
    <div className={styles.spinner} />
    <p className={styles.loadingText}>Loading...</p>
  </div>
);

export default LoadingSpinner;
