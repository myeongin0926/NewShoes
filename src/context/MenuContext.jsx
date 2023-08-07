import { createContext, useContext, useState } from "react";

const MenuContext = createContext();

export function MenuContextProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuOpenHandler = (boo) => {
    setIsOpen(boo);
  };
  return (
    <MenuContext.Provider value={{ isOpen, menuOpenHandler }}>{children}</MenuContext.Provider>
  );
}

export function useMenuContext() {
  return useContext(MenuContext);
}
