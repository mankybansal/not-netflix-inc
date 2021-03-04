import { useAppContext } from "./useAppContext";
import { useTimer } from "./useTimer";
import { useCallback, useState } from "react";

// Hook to simulate network request for checkout
export const useCheckout = (
  id?: string
): { isSubmitting: boolean; handleCheckout: () => void } => {
  const { setCurrentPage, setSelected } = useAppContext();
  const timeoutRef = useTimer();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleCheckout = useCallback(() => {
    setIsSubmitting(true);
    if (id) {
      setSelected([id]);
    }
    timeoutRef.current = setTimeout(() => setCurrentPage("OrderDetails"), 3000);
  }, [setCurrentPage, timeoutRef]);

  return { isSubmitting, handleCheckout };
};
