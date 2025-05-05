'use client';

import { useEffect, useState } from 'react';
import styles from '@/styles/ImageAnimation.module.css';

type Props = {
  src: string;
  alt: string;
};

export default function TopImage({ src, alt }: Props) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // 戻り値をの型を定義
    const timers: number[] = [];
    // ８段階で元の画像へ戻す
    for (let i = 1; i <= 8; i++) {
      timers.push(setTimeout(() => setStage(i), i * 300));
    }

    // ユーザーが途中で画面遷移等の操作をした場合のクリーンアップ関数
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <img
      src={src}
      alt={alt}
      className={`${styles.Image} ${styles[`stage-${stage}`]}`}
    />
  );
}

