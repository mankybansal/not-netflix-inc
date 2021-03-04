import React, { memo } from "react";

import "styles.css";
import { AppProvider, useAppContext } from "hooks/useAppContext";
import Pages from "components/pages";

const AppContent = () => {
  const { currentPage } = useAppContext();
  return currentPage === "Search" ? (
    <Pages.Search />
  ) : currentPage === "Checkout" ? (
    <Pages.Checkout />
  ) : currentPage === "OrderDetails" ? (
    <Pages.OrderDetails />
  ) : currentPage === "MediaDetails" ? (
    <Pages.MediaDetails />
  ) : (
    <></>
  );
};

const App = () => (
  <AppProvider>
    <AppContent />
  </AppProvider>
);

export default memo(App);
