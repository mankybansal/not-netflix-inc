import React, { memo } from "react";
import styled from "@emotion/styled";
import { KeyboardArrowDown } from "@material-ui/icons";
import { motion } from "framer-motion";

import { Animations, Styled } from "components/generic";

const RootContainer = styled(motion.div)`
  :not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
  padding: 20px 32px;
  width: 100%;
  display: flex;
  font-size: 14px;
  box-sizing: border-box;
  text-align: left;
`;

const Label = styled.div`
  color: #888;
  width: 150px;
`;

const Value = styled.div`
  color: #333;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

const Action = styled.div`
  margin-left: auto;
`;

interface Props {
  idx: number;
  label: React.ReactNode;
  edit?: boolean;
  expand?: boolean;
  children?: React.ReactNode | React.ReactNode[];
}

const PaymentDetails = ({ idx, edit, expand, label, children }: Props) => (
  <RootContainer
    {...Animations.AnimateLeft}
    transition={{ delay: 0.4 + 0.025 * idx }}
  >
    <Label>{label}</Label>
    <Value>{children}</Value>
    <Action>
      {edit ? (
        <Styled.BaseButton>Edit</Styled.BaseButton>
      ) : expand ? (
        <KeyboardArrowDown />
      ) : (
        <></>
      )}
    </Action>
  </RootContainer>
);

export default memo(PaymentDetails);
