import { createContext, useEffect, useState } from 'react';
import { LayoutType } from 'resources';

export const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [theme, setTheme] = useState(LayoutType.horizontal);

  const [browserWidth, setBrowserWidth] = useState(0);

  useEffect(() => {
    setTheme(localStorage.getItem('currentTheme') || LayoutType.horizontal);
  }, []);

  useEffect(() => {
    if (browserWidth === 0) {
      const windowWidth = window.innerWidth;

      if (windowWidth <= 1024) setTheme(LayoutType.minimal);
      setBrowserWidth(windowWidth);
    }
  }, [browserWidth]);

  const changeTheme = temp => {
    localStorage.setItem('currentTheme', temp);
    setTheme(temp);
  };

  const value = {
    browserWidth,
    changeTheme,
    theme
  };

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};
