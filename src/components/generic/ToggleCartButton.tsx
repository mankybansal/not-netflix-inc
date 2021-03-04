import React, { memo, useCallback } from "react";
import { AddShoppingCart, RemoveShoppingCart } from "@material-ui/icons";
import styled from "@emotion/styled";

import { useAppContext } from "hooks";

import { Styled } from "./";

const RootContainer = styled(Styled.BaseButton)<{
  subtle?: boolean;
  remove?: boolean;
}>`
  color: ${({ remove, subtle }) =>
    remove ? (subtle ? "#777" : "#DF302A") : "#000"};
  span {
    margin: 0 8px;
  }
`;

interface Props {
  showText?: boolean;
  subtle?: boolean;
  className?: string;
  id: string;
}

const ToggleCartButton = ({ subtle, className, id, showText }: Props) => {
  const { selected, toggleSelected } = useAppContext();
  const isSelected = !!selected.find((i) => i === id);

  const handleSelect = useCallback(() => toggleSelected(id), [
    toggleSelected,
    id
  ]);

  const Icon = isSelected ? RemoveShoppingCart : AddShoppingCart;
  const text = isSelected ? "Remove from Cart" : "Add to Cart";
  return (
    <RootContainer
      className={className}
      remove={isSelected}
      onClick={handleSelect}
      subtle={subtle}
    >
      <Icon fontSize="small" />
      {showText && <span>{text}</span>}
    </RootContainer>
  );
};

export default memo(ToggleCartButton);
