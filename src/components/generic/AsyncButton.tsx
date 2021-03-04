import React, { memo } from "react";

import * as Styled from "./Styled";

interface Props {
  isSpinning?: boolean;
  onClick: () => void;
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  disabled?: boolean;
}

const AsyncButton = ({
  className,
  disabled,
  isSpinning,
  children,
  onClick
}: Props) => (
  <Styled.BrandButton
    className={className}
    disabled={isSpinning || disabled}
    onClick={onClick}
  >
    {isSpinning ? <Styled.Spinner /> : children}
  </Styled.BrandButton>
);

export default memo(AsyncButton);
