import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import axios, { AxiosResponse } from "axios";
import "@testing-library/jest-dom";

import App from "../App";
import * as Types from "types";

jest.mock("axios");
afterEach(cleanup);

describe("<App/>", () => {
  it("renders without crashing", async () => {
    render(<App />);
  });

  it("renders with <Pages.Search/> by default", async () => {
    render(<App />);
    expect(screen.getByText("Not Netflix Inc.")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("harry potter and the")
    ).toBeInTheDocument();
  });

  it("renders results in <Pages.Search/>", async () => {
    ((axios.get as unknown) as jest.Mock).mockResolvedValueOnce(searchResponse);
    render(<App />);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(await screen.findByText("Harry Potter Test 1")).toBeInTheDocument();
    expect(await screen.findByText("Harry Potter Test 2")).toBeInTheDocument();
  });
});

const searchResponse: AxiosResponse<Types.SearchResponse> = {
  data: {
    Search: [
      {
        Title: "Harry Potter Test 1",
        Year: "2011",
        imdbID: "tt1201607",
        Type: "movie",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg"
      },
      {
        Title: "Harry Potter Test 2",
        Year: "2001",
        imdbID: "tt0241527",
        Type: "movie",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BNjQ3NWNlNmQtMTE5ZS00MDdmLTlkZjUtZTBlM2UxMGFiMTU3XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg"
      }
    ],
    totalResults: "2",
    Response: "True"
  },
  status: 200,
  statusText: "OK",
  config: {},
  headers: {}
};
