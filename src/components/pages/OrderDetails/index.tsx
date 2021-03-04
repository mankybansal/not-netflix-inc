import React, { useEffect, memo } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import {
  Check,
  KeyboardArrowDown,
  KeyboardArrowLeftSharp
} from "@material-ui/icons";

import * as Utils from "utils";
import { usePriceBreakdown, useAppContext, useCountdown } from "hooks";
import { Footer, Animations, Styled, BannerLogo } from "components/generic";

import OrderDetails from "./OrderDetails";
import pluralize from "pluralize";

const RootContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
`;

const BaseBanner = styled(motion.div)`
  color: white;
  padding: 12px 32px;
  box-sizing: border-box;
  width: 100%;
  text-align: left;
`;

const EditTimeLeftBanner = styled(BaseBanner)<{ inactive?: boolean }>`
  background: ${({ inactive }) => (inactive ? "#ccc" : "#24b35f")};
`;

const FastBanner = styled(BaseBanner)`
  background: black;
`;

const OrderStatusContainer = styled(motion.div)`
  display: flex;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  padding: 16px 32px;
  box-sizing: border-box;
  align-items: center;
`;

const OrderStatus = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 12px;
  color: #888;
`;

const OrderTotal = styled.div`
  margin-left: auto;
  padding: 8px 24px;
  border-radius: 8px;
  background: #f7f8fa;
  font-weight: 600;
  align-items: center;
  display: flex;
  svg {
    margin-left: 8px;
  }
`;

const OrderThumb = styled.div`
  margin-right: 16px;
  display: flex;
  justify-content: center;
  font-size: 12px;
  font-weight: 800;
  align-items: center;
  color: cornflowerblue;
`;

const OrderStatusText = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: black;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
`;

const CheckIcon = styled(Check)`
  margin-left: 8px;
  color: #24b35f;
`;

const strings = {
  editTimeLeft: (seconds: number) =>
    `${Utils.pad(Math.floor(seconds / 60), 2)}:${Utils.pad(
      seconds % 60,
      2
    )} to cancel or edit the order`
};

const EDIT_TIME_SECONDS = 60;

const OrderDetailsPage = () => {
  const { selected, setCurrentPage, clearSelected } = useAppContext();
  const { grandTotal } = usePriceBreakdown();
  const [editTimeLeft] = useCountdown(EDIT_TIME_SECONDS);

  // Clear selected ids when we navigate out.
  useEffect(() => clearSelected, [clearSelected]);

  return (
    <RootContainer>
      <BannerLogo />
      <Styled.SpacerColumn>
        <Styled.PageTitle {...Animations.AnimateDown}>
          Order #3212
        </Styled.PageTitle>
        <Styled.PageSubTitle {...Animations.AnimateDown}>
          Placed on 3rd Nov, 2020 at 07:30pm PST
        </Styled.PageSubTitle>
        <FastBanner {...Animations.AnimateDown}>
          Powered by <Styled.Fast>Fast</Styled.Fast>™
        </FastBanner>
        <EditTimeLeftBanner
          {...Animations.AnimateDown}
          transition={{ delay: 0.1 }}
          inactive={editTimeLeft === 0}
        >
          {strings.editTimeLeft(editTimeLeft)}
        </EditTimeLeftBanner>
        <OrderStatusContainer
          {...Animations.AnimateDown}
          transition={{ delay: 0.2 }}
        >
          <OrderStatus {...Animations.AnimateLeft} transition={{ delay: 0.3 }}>
            <OrderStatusText>
              Order Received <CheckIcon />
            </OrderStatusText>
            <div>www.blockbuster.com</div>
          </OrderStatus>
          <OrderTotal>
            <OrderThumb>{pluralize("item", selected.length, true)}</OrderThumb>$
            {grandTotal.toFixed(2)}
            <KeyboardArrowDown />
          </OrderTotal>
        </OrderStatusContainer>
        <OrderDetails />
      </Styled.SpacerColumn>
      <Footer>
        <Styled.NavButton onClick={() => setCurrentPage("Search")}>
          <KeyboardArrowLeftSharp /> <span>Continue Shopping</span>
        </Styled.NavButton>
      </Footer>
    </RootContainer>
  );
};

export default memo(OrderDetailsPage);
