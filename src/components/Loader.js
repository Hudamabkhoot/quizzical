import React from 'react';
import PropagateLoader from "react-spinners/PropagateLoader";
import styles from '../css-modules/QuizPage.module.css';

export default function Loader() {
  return (
    <div className={styles.loading}>
      <PropagateLoader
      color="#4D5B9E"
      size={20}
      />
    </div>  );
}