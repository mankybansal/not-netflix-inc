import React, { useContext, useCallback, useState, createContext } from "react";
import * as Types from "types";

type AppContext = {
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  currentPage: Types.Step;
  setCurrentPage: React.Dispatch<React.SetStateAction<Types.Step>>;
  viewingImdbId: string | null;
  setViewingImdbId: React.Dispatch<React.SetStateAction<string | null>>;
};

const AppContext = createContext<AppContext>({
  selected: [],
  setSelected: () => {
    return;
  },
  currentPage: "Search",
  setCurrentPage: () => {
    return;
  },
  viewingImdbId: null,
  setViewingImdbId: () => {
    return;
  }
});

interface AppProviderProps {
  children: React.ReactNode[] | React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps): JSX.Element => {
  const [selected, setSelected] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<Types.Step>("Search");
  const [viewingImdbId, setViewingImdbId] = useState<string | null>(null);

  return (
    <AppContext.Provider
      value={{
        currentPage: currentPage,
        setCurrentPage: setCurrentPage,
        selected,
        setSelected,
        viewingImdbId,
        setViewingImdbId
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContext & {
  toggleSelected: (id: string) => void;
  clearSelected: () => void;
} => {
  const appContextValues = useContext(AppContext);
  const { selected, setSelected } = appContextValues;

  const toggleSelected = useCallback(
    (toggleId: string) => {
      const resultIdx = selected.findIndex((id) => id === toggleId);
      const newIds = [...selected];

      if (resultIdx !== -1) {
        newIds.splice(resultIdx, 1);
      } else {
        newIds.push(toggleId);
      }

      setSelected(newIds);
    },
    [selected, setSelected]
  );

  const clearSelected = useCallback(() => setSelected([]), [setSelected]);

  return {
    ...appContextValues,
    toggleSelected,
    clearSelected
  };
};
