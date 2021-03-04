import React, { memo } from "react";
import { KeyboardArrowLeftSharp, Lock } from "@material-ui/icons";

import styled from "@emotion/styled";
import { motion } from "framer-motion";

import { useAppContext, usePriceBreakdown, useCheckout } from "hooks";
import {
  Footer,
  BannerLogo,
  Styled,
  Animations,
  AsyncButton
} from "components/generic";

import Order from "./Order";
import pluralize from "pluralize";

const CheckoutButton = styled(AsyncButton)`
  margin-left: auto;
  svg {
    margin-right: 16px;
  }
`;

const RootContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0 0 60px 0;
  flex-direction: column;
  align-items: center;
`;

const OrdersContainer = styled(motion.div)`
  background: white;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  max-width: 700px;
  margin: 0 auto;
`;

const CartTotalContainer = styled(motion.div)`
  margin: 32px;
  display: flex;
  margin-left: auto;
  align-items: flex-end;
  flex-direction: column;
`;

const LineItem = styled.div<{ emphasize?: boolean }>`
  display: flex;
  align-items: flex-end;
  margin-top: ${({ emphasize }) => (emphasize ? "8px" : "4px")};
  color: ${({ emphasize }) => (emphasize ? "#000" : "#333")};
  font-size: ${({ emphasize }) => (emphasize ? "20px" : "16px")};
  font-weight: ${({ emphasize }) => (emphasize ? 700 : 400)};
`;

const LineItemAmount = styled.div`
  width: 100px;
  text-align: right;
`;

const LineItemLabel = styled.div``;

const CheckoutPage = () => {
  const { selected, setCurrentPage } = useAppContext();
  const { subTotal, taxTotal, serviceTotal, grandTotal } = usePriceBreakdown();
  const { isSubmitting, handleCheckout } = useCheckout();

  return (
    <RootContainer>
      <BannerLogo />
      <Styled.SpacerColumn>
        <Styled.PageTitle {...Animations.AnimateDown}>
          Checkout
        </Styled.PageTitle>
        <Styled.PageSubTitle {...Animations.AnimateDown}>
          {pluralize("item", selected.length, true)} selected
        </Styled.PageSubTitle>
      </Styled.SpacerColumn>
      <OrdersContainer {...Animations.AnimateDown}>
        {selected.map((id, idx) => (
          <Order key={`order-${id}`} id={id} idx={idx} />
        ))}
      </OrdersContainer>

      <Styled.Spacer>
        <CartTotalContainer
          {...Animations.AnimateDown}
          transition={{ delay: 0.3 }}
        >
          <LineItem>
            <LineItemLabel>Subtotal:</LineItemLabel>
            <LineItemAmount>${subTotal.toFixed(2)}</LineItemAmount>
          </LineItem>
          <LineItem>
            <LineItemLabel>Sales tax @10.1%:</LineItemLabel>
            <LineItemAmount>${taxTotal.toFixed(2)}</LineItemAmount>
          </LineItem>
          <LineItem>
            <LineItemLabel>Service fee @2.5%:</LineItemLabel>
            <LineItemAmount>${serviceTotal.toFixed(2)}</LineItemAmount>
          </LineItem>
          <LineItem emphasize>
            <LineItemLabel>Grand total:</LineItemLabel>
            <LineItemAmount>${grandTotal.toFixed(2)}</LineItemAmount>
          </LineItem>
        </CartTotalContainer>
      </Styled.Spacer>

      <Footer>
        <Styled.NavButton onClick={() => setCurrentPage("Search")}>
          <KeyboardArrowLeftSharp /> <span>Back</span>
        </Styled.NavButton>
        <CheckoutButton isSpinning={isSubmitting} onClick={handleCheckout}>
          <Lock fontSize="small" /> Fast Checkout
        </CheckoutButton>
      </Footer>
    </RootContainer>
  );
};

export default memo(CheckoutPage);
