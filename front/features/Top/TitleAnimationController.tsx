'use client';

import { useState, useEffect } from 'react';
import styles from '@/styles/top/TitleAnimation.module.css';


export default function TopTitle() {
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <h1 className={`${styles.title} ${showTitle ? styles.enter : ''} text-4xl font-bold`}>
      コトダマノキ
    </h1>
  )
}
