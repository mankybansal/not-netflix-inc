import React, { memo, useCallback, useState } from "react";
import styled from "@emotion/styled";
import { LiveTv, Search } from "@material-ui/icons";

import { useAppContext, QuerySearchParams } from "hooks";

import * as Styled from "./Styled";

const RootContainer = styled.div`
  height: 60px;
  position: sticky;
  top: 0;
  left: 0;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  z-index: 100;
  padding: 8px 24px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
`;

const SearchInput = styled.input`
  width: 100%;
  outline: none;
  padding: 8px 16px;
  border: none;
  height: 44px;
  font-weight: 600;
  box-sizing: border-box;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  background: #f7f8fa;

  ::placeholder {
    color: #aaa;
    font-weight: normal;
  }
`;

const SearchButton = styled(Styled.BaseButton)`
  color: #aaa;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  background: #f7f8fa;
  width: 100px;
`;

const Logo = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-start;
  color: #c62621;
  font-weight: 700;
  align-items: center;
  width: 100%;

  svg {
    margin-right: 12px;
    margin-top: -6px;
  }
`;

interface Props {
  params: QuerySearchParams;
  setParams: React.Dispatch<React.SetStateAction<QuerySearchParams>>;
}

const Header = ({ params, setParams }: Props) => {
  const [value, setValue] = useState(params.s);
  const { setCurrentPage } = useAppContext();

  const handleKeypress = useCallback(
    ({ key }) => {
      if (key === "Enter") {
        setParams({
          s: value?.trim(),
          page: 1,
          i: undefined
        });
        setCurrentPage("Search");
      }
    },
    [setCurrentPage, value, setParams]
  );

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    []
  );

  return (
    <RootContainer>
      <Styled.Spacer>
        <Logo>
          <LiveTv />
          Not Netflix Inc.
        </Logo>
        <SearchInput
          aria-label="search-input"
          value={value}
          onKeyPress={handleKeypress}
          onChange={handleOnChange}
          placeholder="Type in a movie name..."
        />
        <SearchButton
          aria-label="search-button"
          onClick={() =>
            setParams({
              s: value?.trim(),
              page: 1,
              i: undefined
            })
          }
        >
          <Search />
        </SearchButton>
      </Styled.Spacer>
    </RootContainer>
  );
};

export default memo(Header);
