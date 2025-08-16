import { useState, useEffect } from 'react';

/**
 * Custom hook for managing dark mode with system preference detection
 * @returns {Array} [isDarkMode, toggleDarkMode] - Current theme state and toggle function
 */
const useDarkMode = () => {
  // Check system preference and localStorage on initial load
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if we're in browser environment
    if (typeof window === 'undefined') {
      return false;
    }

    // First check localStorage for saved preference
    const savedTheme = localStorage.getItem('finance-tracker-theme');
    if (savedTheme !== null) {
      return savedTheme === 'dark';
    }

    // If no saved preference, check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }

    return false;
  });

  // Update document class and localStorage when theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('finance-tracker-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('finance-tracker-theme', 'light');
    }
  }, [isDarkMode]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only update if user hasn't manually set a preference
      const savedTheme = localStorage.getItem('finance-tracker-theme');
      if (!savedTheme) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return [isDarkMode, toggleDarkMode];
};

export default useDarkMode;