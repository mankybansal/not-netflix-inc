import React, { memo } from "react";
import { LiveTv } from "@material-ui/icons";
import styled from "@emotion/styled";
import * as Styled from "./Styled";

const RootContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  background: #b20710;
`;

const Logo = styled.div`
  padding: 20px 32px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  color: white;
  font-weight: 800;
  align-items: center;

  svg {
    margin-right: 12px;
    margin-top: -6px;
  }
`;

const BannerLogo = () => (
  <RootContainer>
    <Styled.Spacer>
      <Logo>
        <LiveTv />
        Not Netflix Inc.
      </Logo>
    </Styled.Spacer>
  </RootContainer>
);

export default memo(BannerLogo);
