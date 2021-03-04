import React, { memo, useCallback } from "react";
import styled from "@emotion/styled";
import { ArrowRightAlt, SportsEsports, Tv, Movie } from "@material-ui/icons";
import { motion } from "framer-motion";

import * as Types from "types";
import { imageFallback } from "utils";
import { useAppContext } from "hooks";

import { Animations, Styled, ToggleCartButton } from "components/generic";

const ResultContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  padding: 16px 8px;
  width: calc(100% - 150px);
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #1b1d20;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ResultType = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
  text-transform: capitalize;
  margin-top: 4px;

  svg {
    margin-right: 8px;
    color: #ccc;
  }
`;

const RootContainer = styled(motion.div)<{ isSelected: boolean }>`
  background: white;
  margin: 24px auto;
  position: relative;
  align-items: flex-start;
  display: flex;
  transition: all ease-in 0.2s;
  box-shadow: ${({ isSelected }) =>
    isSelected
      ? `0 4px 20px rgba(0, 0, 0, 0.5)`
      : `0 4px 20px rgba(0, 0, 0, 0.05);`};
  border-radius: 16px;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;

  border: ${({ isSelected }) =>
    isSelected ? `8px solid #333` : `8px solid transparent`};
`;

const PosterContainer = styled.div`
  width: 100px;
  height: 150px;
  margin-right: 8px;
  overflow: hidden;
  border-radius: 4px;
  background: #eee;
  position: relative;
  align-items: center;
`;

const Year = styled.div`
  margin-top: 4px;
  font-size: 14px;
`;

const PosterBackdrop = styled.img`
  filter: blur(10px);
  width: 100%;
  height: auto;
`;

const Poster = styled.img`
  height: 100%;
  position: absolute;
  z-index: 1;
  right: 0;
  top: 0;
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  margin-top: 8px;
  position: absolute;
  bottom: 8px;
  right: 8px;
`;

const ViewButton = styled(Styled.BaseButton)`
  margin-left: 16px;

  svg {
    margin-left: 4px;
    transition: all ease 0.3s;
  }

  :hover {
    svg {
      margin-left: 12px;
    }
  }
`;

interface Props {
  result: Types.SearchResult;
}

const SearchResult = ({ result }: Props) => {
  const { selected, setViewingImdbId, setCurrentPage } = useAppContext();
  const isSelected = !!selected.find((id) => id === result.imdbID);

  const handleView = useCallback(() => {
    setViewingImdbId(result.imdbID);
    setCurrentPage("MediaDetails");
  }, [result.imdbID]);
  const onError = useCallback(imageFallback, []);

  return (
    <RootContainer {...Animations.AnimateDown} isSelected={isSelected}>
      <PosterContainer>
        <PosterBackdrop onError={onError} src={result.Poster} alt="poster2" />
        <Poster onError={onError} src={result.Poster} alt="poster" />
      </PosterContainer>
      <ResultContent>
        <Title>{result.Title} </Title>
        <Year>({result.Year})</Year>
        <ResultType>
          {result.Type === "movie" ? (
            <Movie fontSize="small" />
          ) : result.Type === "game" ? (
            <SportsEsports fontSize="small" />
          ) : result.Type === "series" ? (
            <Tv fontSize="small" />
          ) : (
            <></>
          )}
          {result.Type}
        </ResultType>
        <ActionsContainer>
          <ViewButton onClick={handleView}>
            View <ArrowRightAlt />
          </ViewButton>
          <ToggleCartButton id={result.imdbID} />
        </ActionsContainer>
      </ResultContent>
    </RootContainer>
  );
};

export default memo(SearchResult);
