import {useEffect, useRef, useState} from "react";


function calculateTimeLeft(end_time) {
    const total = Date.parse(end_time) - Date.now();
    if (isNaN(total)) {
        return { hours: 0, minutes: 0, seconds: 0, total: 0 };
    }

    const clamped = Math.max(total, 0);

    const hours = Math.floor(clamped / (1000 * 60 * 60));
    const minutes = Math.floor((clamped / (1000 * 60)) % 60);
    const seconds = Math.floor((clamped / 1000) % 60);
    return {hours, minutes, seconds, total: clamped}
    }


export function useCountdown(end_time) {
    const [countdown, setCountdown] = useState(() => calculateTimeLeft(end_time))
    const intervalRef = useRef(null)

    useEffect(() => {
        setCountdown(calculateTimeLeft(end_time))

         if (!end_time || isNaN(Date.parse(end_time))) {
             return;
            }

         if (intervalRef.current) {
             clearInterval(intervalRef.current)
             intervalRef.current = null;
         }

         intervalRef.current = setInterval(() => {
             const newCountdown = calculateTimeLeft(end_time);


        if (newCountdown.total <= 0) {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setCountdown({ hours: 0, minutes: 0, seconds: 0, total: 0 });
  } else {
    setCountdown(newCountdown);
  }
}, 1000);

        return () => {
         if (intervalRef.current){
             clearInterval(intervalRef.current)
             intervalRef.current = null;
         }
        }

}, [end_time]
    );


  return countdown
}
