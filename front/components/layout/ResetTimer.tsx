"use client"

import { useTimer } from "react-timer-hook"

export default function ResetTimer({timestamp}: {timestamp: string}) {
  const expiryTimestamp = new Date(timestamp);

  const {
    seconds,
    minutes,
    hours,
    days
  } = useTimer({ expiryTimestamp });
  
  const padZero = (num: number) => {
    return num.toString().padStart(2, '0');
  }
  return (
    <div style={{textAlign: 'center'}}>
      <div className="">
        <span>{padZero(days * 24 + hours)}</span>
        :<span>{padZero(minutes)}</span>
        :<span>{padZero(seconds)}</span>
      </div>
    </div>
  );
}
