import React, { memo } from "react";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";

import * as Animations from "./Animations";
import * as Styled from "./Styled";

const RootContainer = styled(motion.div)`
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  z-index: 100;
  padding: 8px 16px;
  box-sizing: border-box;
`;

interface Props {
  shouldShow?: boolean;
  children?: React.ReactNode | React.ReactNode[];
}

const Footer = ({ children, shouldShow = true }: Props) => (
  <AnimatePresence>
    {shouldShow && (
      <RootContainer {...Animations.MenuUp}>
        <Styled.Spacer>{children}</Styled.Spacer>
      </RootContainer>
    )}
  </AnimatePresence>
);

export default memo(Footer);
