import { useAppContext } from "./useAppContext";

export const usePriceBreakdown = (): {
  subTotal: number;
  taxTotal: number;
  serviceTotal: number;
  grandTotal: number;
} => {
  const { selected } = useAppContext();

  // This would be calculated using the prices from
  // a price api but since we don't have it, let's use
  // (# of items in the cart) x (fixed $ price).
  const subTotal = 4.95 * selected.length;
  const taxTotal = subTotal * 0.101;
  const serviceTotal = taxTotal * 0.025;
  const grandTotal = subTotal + taxTotal + serviceTotal;

  return { subTotal, taxTotal, serviceTotal, grandTotal };
};
