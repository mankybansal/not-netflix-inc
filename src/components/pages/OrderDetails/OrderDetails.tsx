import React, { memo } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { CreditCard } from "@material-ui/icons";

import { Animations } from "components/generic";

import PaymentDetails from "./PaymentDetails";

const RootContainer = styled(motion.div)`
  display: flex;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;
  margin-top: 24px;
  flex-direction: column;
  padding: 0;
  align-items: flex-start;
  font-size: 12px;
  color: #888;
`;

const SubAddress = styled.div`
  font-weight: normal;
  font-size: 12px;
  color: #888;
  margin-top: 4px;
`;

const OrderDetails = () => (
  <RootContainer {...Animations.AnimateDown} transition={{ delay: 0.4 }}>
    <PaymentDetails idx={1} edit label={"User"}>
      Heed Rastings
    </PaymentDetails>
    <PaymentDetails idx={2} expand label={"Email"}>
      heed@not.netflix.com
    </PaymentDetails>
    <PaymentDetails idx={3} expand label={"Phone"}>
      +1 (408) 540-0037
    </PaymentDetails>
    <PaymentDetails idx={4} expand label={"Ship to"}>
      <div>
        <div>100 Winchester Rhombus</div>
        <SubAddress>Los Gatos, CA 95032</SubAddress>
      </div>
    </PaymentDetails>
    <PaymentDetails idx={5} expand label={"Payment"}>
      <CreditCard style={{ color: "cornflowerblue", marginRight: 4 }} />
      VISA ending in 1234
    </PaymentDetails>
  </RootContainer>
);

export default memo(OrderDetails);
