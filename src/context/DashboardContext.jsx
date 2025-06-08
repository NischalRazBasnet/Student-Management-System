import { createContext, useState, useContext } from 'react';

const DashboardContext = createContext();

export const useDashboardContext = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <DashboardContext.Provider value={{ isOpen, toggleDrawer }}>
      {children}
    </DashboardContext.Provider>
  );
};
