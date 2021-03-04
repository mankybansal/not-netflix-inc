import React, { useState, useEffect } from "react";

import axios from "axios";
import { appConfig } from "app.config";
import * as Types from "types";

export type QuerySearchParams = {
  s?: string;
  page?: number;
  i?: string;
};

// eslint-disable-next-line
const responseIsSearch = (obj: any): obj is Types.SearchResponse => {
  return obj.Search !== undefined;
};

// eslint-disable-next-line
const responseIsTitle = (obj: any): obj is Types.TitleResponse => {
  return obj.Title !== undefined;
};

export const useOmdbApi = <TType = Types.SearchResponse | Types.TitleResponse>(
  initParams: QuerySearchParams
): {
  data: TType | null;
  isLoading: boolean;
  isError: boolean;
  params: QuerySearchParams;
  setParams: React.Dispatch<React.SetStateAction<QuerySearchParams>>;
} => {
  const [data, setData] = useState<TType | null>(null);
  const [params, setParams] = useState<QuerySearchParams>(initParams);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios.get<TType>(appConfig.dev.omdbApiUrl, {
          params: {
            apiKey: appConfig.dev.omdbApiKey,
            ...params
          }
        });

        // Guarantee result data type using type guard
        if (responseIsTitle(result.data)) {
          setData(result.data);
        } else if (responseIsSearch(result.data)) {
          // Hacky merge logic to merge pages
          const newData = (data as unknown) as Types.SearchResponse;
          if (params.page && params?.page > 1) {
            setData({
              ...newData,
              Search: [...newData.Search, ...result.data.Search]
              // eslint-disable-next-line
            } as any);
          } else {
            setData(result.data);
          }
        }
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();

    // TODO: Use abortController to cleanup if component is unmounted
  }, [params]);

  return { data, isLoading, isError, params, setParams };
};
