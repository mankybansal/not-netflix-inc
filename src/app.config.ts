export type AppConfig = {
  dev: {
    omdbApiKey: string;
    omdbApiUrl: string;
  };
};

export const appConfig: AppConfig = {
  dev: {
    omdbApiKey: "11d394d2",
    omdbApiUrl: "https://www.omdbapi.com/"
  }
};
