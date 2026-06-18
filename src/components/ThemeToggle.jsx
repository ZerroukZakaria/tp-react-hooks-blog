import React from 'react';
import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {

  const {
    theme,
    toggleTheme
  } = useTheme();

  return (
    <button
      className="btn btn-outline-secondary"
      onClick={toggleTheme}
    >
      {theme === 'light'
        ? '🌙 Mode sombre'
        : '☀️ Mode clair'}
    </button>
  );
}

export default ThemeToggle;