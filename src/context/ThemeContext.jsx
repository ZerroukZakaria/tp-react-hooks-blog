import React, {
  createContext,
  useContext
} from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

// Créer le contexte
const ThemeContext = createContext();

/**
 * Provider pour le contexte de thème
 */
export function ThemeProvider({ children }) {

  const [theme, setTheme] =
    useLocalStorage('theme', 'light');

  const toggleTheme = () => {

    setTheme(
      theme === 'light'
        ? 'dark'
        : 'light'
    );

  };

  const value = {
    theme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook personnalisé pour utiliser le contexte de thème
 */
export function useTheme() {

  const context =
    useContext(ThemeContext);

  if (!context) {

    throw new Error(
      'useTheme must be used within ThemeProvider'
    );

  }

  return context;
}

export default ThemeContext;