export const AnimateDown = {
  initial: { y: 30, opacity: 0 },
  animate: { y: 0, opacity: 1 }
};

export const AnimateLeft = {
  initial: { x: -30, opacity: 0 },
  animate: { x: 0, opacity: 1 }
};

export const MenuUp = {
  animate: { opacity: 1, y: 0 },
  initial: { opacity: 0, y: 50 },
  exit: { opacity: 0, y: 50 },
  transition: { type: "tween", duration: 0.2 }
};
