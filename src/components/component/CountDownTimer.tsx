/** @format */

import React, {useState, useEffect} from "react";

export const CountdownTimer = ({
  initialMinutes,
  initialSeconds,
  onComplete,
}: {
  initialMinutes: number;
  initialSeconds: number;
  onComplete: any;
}) => {
  const [time, setTime] = useState({
    minutes: initialMinutes,
    seconds: initialSeconds,
  });

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime((prevTime) => {
        let {minutes, seconds} = prevTime;

        // Handle countdown logic
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(timerId); // Stop the timer
            if (onComplete) {
              onComplete(); // Call the onComplete callback
            }
            return prevTime; // Return unchanged time
          }
          minutes -= 1;
          seconds = 59;
        } else {
          seconds -= 1;
        }

        return {minutes, seconds};
      });
    }, 1000);

    return () => clearInterval(timerId); // Cleanup on unmount
  }, [onComplete]);

  return (
    <div>
      <h1>
        {String(time.minutes).padStart(2, "0")}:
        {String(time.seconds).padStart(2, "0")}
      </h1>
    </div>
  );
};

export default CountdownTimer;
