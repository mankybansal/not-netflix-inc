import React, { memo, useCallback } from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";

import * as Types from "types";
import { imageFallback } from "utils";
import { useOmdbApi } from "hooks";
import { Animations, ToggleCartButton } from "components/generic";

const OrderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  flex: 1;
`;

const OrderTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const RootContainer = styled(motion.div)`
  :not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
  padding: 16px 32px;
  box-sizing: border-box;
  background: white;
  align-items: flex-start;
  transition: all ease 0.3s;
  display: flex;
  width: 100%;
`;

const PosterContainer = styled.div`
  height: 64px;
  width: 64px;
  border-radius: 4px;
  overflow: hidden;
  background: #eee;
  margin-right: 16px;
`;

const Poster = styled.img`
  width: 100%;
  height: auto;
`;

const OrderActions = styled.div`
  display: flex;
  width: 100%;
  margin-top: 8px;
`;

const OrderDetails = styled.div`
  font-size: 12px;
`;

const OrderAmount = styled.div`
  display: flex;
  margin-left: auto;
  font-weight: 400;
  color: #888;
`;

interface Props {
  id: string;
  idx: number;
}

const Order = ({ id, idx }: Props) => {
  const { data } = useOmdbApi<Types.TitleResponse>({ i: id });

  const onError = useCallback(imageFallback, []);

  return (
    <RootContainer
      {...Animations.AnimateLeft}
      transition={{ delay: 0.02 * idx }}
    >
      <PosterContainer>
        <Poster onError={onError} src={data?.Poster} height="50" alt="poster" />
      </PosterContainer>
      <OrderContent>
        <OrderTitle>{data?.Title ?? "Loading..."}</OrderTitle>
        <OrderDetails>
          ({data?.Year ?? "...."}) {data?.Runtime ?? "...."}
        </OrderDetails>
        <OrderActions>
          <ToggleCartButton subtle id={id} showText />
          <OrderAmount>$4.95</OrderAmount>
        </OrderActions>
      </OrderContent>
    </RootContainer>
  );
};

export default memo(Order);
