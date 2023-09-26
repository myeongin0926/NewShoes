import React, { createContext, useContext } from "react";
import { useState } from "react";

const SortOptionContext = createContext();

export function SortOptionContextProvider({ children }) {
  const [sortOption, setSortOption] = useState({
    brand: { text: "-", value: "" },
    sort: { text: "-", value: "" },
    grid: true,
  });

  const sortOptionHandler = (option, value) => {
    setSortOption((preOption) => ({ ...preOption, [option]: value }));
  };

  const sortOptionResetHandler = () => {
    setSortOption((pre) => ({
      ...pre,
      brand: { text: "-", value: "" },
      sort: { text: "-", value: "" },
    }));
  };

  return (
    <SortOptionContext.Provider value={{ sortOption, sortOptionHandler, sortOptionResetHandler }}>
      {children}
    </SortOptionContext.Provider>
  );
}

export function useSortOptionContext() {
  return useContext(SortOptionContext);
}
