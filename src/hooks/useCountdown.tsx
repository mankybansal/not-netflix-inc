import { useState, useEffect } from "react";

export const useCountdown = (seconds: number): [number] => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    // Setup timer on component mount
    const editInterval = setInterval(
      () => setTimeLeft((prev) => (prev > 0 ? prev - 1 : prev)),
      1000
    );

    // Cleanup the timer on component unmount
    return () => {
      clearInterval(editInterval);
    };
  }, []);

  return [timeLeft];
};
