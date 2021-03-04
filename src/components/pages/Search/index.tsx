import React, { memo, useCallback } from "react";
import styled from "@emotion/styled";
import pluralize from "pluralize";
import { ShoppingCart, KeyboardArrowRightSharp } from "@material-ui/icons";

import * as Types from "types";
import { useAppContext, useOmdbApi } from "hooks";
import { Header, Footer, Styled, AsyncButton } from "components/generic";

import SearchResult from "./SearchResult";

const RootContainer = styled.div`
  padding: 0;
`;

const ResultsContainer = styled.div`
  padding: 0 24px 60px 24px;
  max-width: 700px;
  margin: 0 auto;
`;

const CartDetails = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #333;
  margin-right: 8px;

  svg {
    margin-right: 4px;
    color: #ccc;
  }
`;

const TotalResults = styled.div`
  text-align: left;
  margin: 12px 0;
`;

const SearchPage = () => {
  const { selected, setCurrentPage, clearSelected } = useAppContext();

  const {
    data,
    params,
    setParams,
    isLoading
  } = useOmdbApi<Types.SearchResponse>({
    s: "harry potter and the",
    page: 1
  });

  const handleShowMore = useCallback(
    () => setParams((prev) => ({ ...prev, page: (prev.page ?? 1) + 1 })),
    [setParams]
  );

  const canShowMore = data?.Search?.length.toString() !== data?.totalResults;

  return (
    <RootContainer>
      <Header params={params} setParams={setParams} />
      <ResultsContainer>
        {data?.Search?.map((result, idx) => (
          <SearchResult
            key={`result-${result.imdbID}-${idx}`}
            result={result}
          />
        )) ||
          (!isLoading && data?.Response === "False" && (
            <TotalResults>No results</TotalResults>
          ))}

        {data?.totalResults && (
          <>
            <AsyncButton
              disabled={!canShowMore}
              isSpinning={isLoading}
              onClick={handleShowMore}
            >
              Show more
            </AsyncButton>
            <TotalResults>
              Showing <b>{data.Search.length}</b> of <b>{data.totalResults}</b>{" "}
              results
            </TotalResults>
          </>
        )}
      </ResultsContainer>

      <Footer shouldShow={selected.length > 0}>
        <CartDetails>
          <ShoppingCart fontSize="small" />
          <b>{selected.length}</b>&nbsp;
          {pluralize("item", selected.length)} in cart
        </CartDetails>
        <Styled.NavButton onClick={clearSelected}>Clear Cart</Styled.NavButton>

        <Styled.NavButton
          style={{ marginLeft: "auto" }}
          onClick={() => setCurrentPage("Checkout")}
        >
          <span>Checkout</span> <KeyboardArrowRightSharp />
        </Styled.NavButton>
      </Footer>
    </RootContainer>
  );
};

export default memo(SearchPage);
