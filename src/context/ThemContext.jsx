import { createContext, useContext } from "react";

const ThemContext = createContext();

const size = {
  xl: "(max-width : 1200px)",
  l: "(max-width : 1000px)",
  m: "(max-width : 768px)",
  s: "(max-width : 576px)",
};

export function ThemContextProvider({ children }) {
  return <ThemContext.Provider value={{ them: size }}>{children}</ThemContext.Provider>;
}

export function useThemContext() {
  return useContext(ThemContext);
}
