import React from "react";

export const pad = (num: number, size: number): string => {
  let numStr = num.toString();
  while (numStr.length < size) numStr = "0" + num;
  return numStr;
};

export const imageFallback = (
  ev: React.SyntheticEvent<HTMLImageElement>
): string =>
  // eslint-disable-next-line
  ((ev.target as any).src =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWMHM6kmFhXDQ6K81cBrzs7VUbKzqMMZeSvQ&usqp=CAU");
