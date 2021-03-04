import React, { memo, useCallback } from "react";
import { useAppContext, useCheckout, useOmdbApi } from "hooks";
import { KeyboardArrowLeftSharp, Lock } from "@material-ui/icons";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

import * as Types from "types";
import {
  AsyncButton,
  BannerLogo,
  Footer,
  Styled,
  Animations,
  ToggleCartButton
} from "components/generic";
import { imageFallback } from "utils";

const MediaDetailsPage = () => {
  const { viewingImdbId } = useAppContext();

  if (!viewingImdbId) {
    return <>No title ID set.</>;
  }

  return <Content id={viewingImdbId} />;
};

interface ContentProps {
  id: string;
}

const Poster = styled.img`
  width: 100%;
  height: auto;
`;

const PosterContainer = styled.div`
  width: 250px;
  height: 250px;
  margin: 16px;
  overflow: hidden;
  border-radius: 4px;
`;

const MediaHero = styled(motion.div)`
  display: flex;
  padding: 24px 0;
`;

const TitleDetails = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const CheckoutButton = styled(AsyncButton)`
  margin: 32px auto 16px auto;
  font-size: 16px;
  width: 300px;
  padding: 24px;
  svg {
    margin-right: 16px;
  }
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: #1b1d20;
`;

const RootContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0 0 100px 0;
  flex-direction: column;
  align-items: center;
`;

const Plot = styled.div`
  padding: 20px;
  text-align: left;
  box-sizing: border-box;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background: white;
  margin: 16px 0;

  div {
    margin-top: 12px;
  }
`;

const Content = ({ id }: ContentProps) => {
  const { setCurrentPage } = useAppContext();
  const { isSubmitting, handleCheckout } = useCheckout(id);

  const { data, isLoading, isError } = useOmdbApi<Types.TitleResponse>({
    i: id
  });

  const onError = useCallback(imageFallback, []);

  if (isLoading) {
    return <Styled.Spinner />;
  }

  if (!data || isError) return <>Error fetching title.</>;

  return (
    <RootContainer>
      <BannerLogo />
      <Styled.SpacerColumn>
        <MediaHero {...Animations.AnimateDown}>
          <PosterContainer>
            <Poster onError={onError} src={data.Poster} alt="poster" />
          </PosterContainer>
          <TitleDetails>
            <Title>{data.Title}</Title>
            <div>
              {data.Genre} {data.Year} [{data.Rated}] {data.Runtime}
            </div>
            <div>
              {data.Language} {data.Country}
            </div>
            <div>
              Directed by <b>{data.Director}</b>
            </div>
            <div>
              Actors: <b>{data.Actors}</b>
            </div>
          </TitleDetails>
        </MediaHero>

        <Plot>
          {data.Plot}
          <div>
            Rating: <b>{data.imdbRating}</b> ({data.imdbVotes} votes)
          </div>
          <div>
            {data.Ratings.map((rating) => (
              <div key={`${rating.Source}`}>
                {rating.Source}: <b>{rating.Value}</b>
              </div>
            ))}
          </div>
        </Plot>

        <CheckoutButton isSpinning={isSubmitting} onClick={handleCheckout}>
          <Lock fontSize="small" /> Fast Checkout this Title
        </CheckoutButton>

        <ToggleCartButton id={id} showText />
      </Styled.SpacerColumn>
      <Footer>
        <Styled.NavButton onClick={() => setCurrentPage("Search")}>
          <KeyboardArrowLeftSharp /> <span>Back</span>
        </Styled.NavButton>
      </Footer>
    </RootContainer>
  );
};

export default memo(MediaDetailsPage);
