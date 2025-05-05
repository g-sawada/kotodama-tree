'use client';

import { useState, useEffect } from 'react';
import styles from '@/styles/ButtonAnimation.module.css';

export default function TopButton() {
  const[showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <button className={`${styles.button} ${showButton ? styles.enter : ''} 
    px-4 py-2 font-bold border-2 border-white rounded transition`}>
      はじめる
    </button>
  )
}
