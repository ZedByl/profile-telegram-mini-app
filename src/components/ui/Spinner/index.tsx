import React, { FC } from 'react';
import styles from './index.module.scss';

export const Spinner: FC = () => {
  return (
    <div className={styles.spinner__container}>
      <div className={styles.spinner}></div>
    </div>
  );
};
