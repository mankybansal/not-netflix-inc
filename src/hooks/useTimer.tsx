import React, { useEffect, useRef } from "react";

export const useTimer = (): React.MutableRefObject<NodeJS.Timer | null> => {
  const timeoutRef = useRef<NodeJS.Timer | null>(null);

  useEffect(
    // Cleanup timer from ref if it is set.
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    [timeoutRef]
  );

  return timeoutRef;
};
